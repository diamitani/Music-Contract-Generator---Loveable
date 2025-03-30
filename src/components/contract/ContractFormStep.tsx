
import { useEffect, useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { CONTRACT_FIELDS, generateContract, CONTRACT_TYPES } from '@/utils/contracts';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import OpenAIService from '@/utils/openai';
import ApiKeyInput from './ApiKeyInput';

const ContractFormStep = () => {
  const { 
    contractDetails, 
    updateContractDetails, 
    setGeneratedContract,
    setCurrentStep,
    apiKey,
    useAI,
    toggleUseAI,
    useDefaultApiKey
  } = useContract();
  
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [contractFields, setContractFields] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (contractDetails.type && CONTRACT_FIELDS[contractDetails.type]) {
      setContractFields(CONTRACT_FIELDS[contractDetails.type]);
      setFormData({...contractDetails});
    }
  }, [contractDetails]);
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const requiredFields = Object.entries(contractFields.fields)
      .filter(([_, field]: [string, any]) => field.required)
      .map(([key]) => key);
      
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.map(field => contractFields.fields[field].label).join(', ')}`);
      setIsSubmitting(false);
      return;
    }
    
    try {
      updateContractDetails(formData);
      
      let contract;
      
      // Use AI if enabled and API key is available (either default or user's)
      if (useAI && apiKey) {
        try {
          const openai = new OpenAIService({ apiKey });
          const contractTypeName = CONTRACT_TYPES.find(t => t.id === contractDetails.type)?.name || contractDetails.type;
          
          const prompt = Object.entries(formData)
            .map(([key, value]) => `${contractFields.fields[key]?.label || key}: ${value}`)
            .join(', ');
          
          const aiGeneratedContract = await openai.generateContract(prompt, contractTypeName as string);
          contract = aiGeneratedContract;
        } catch (error: any) {
          console.error("AI Generation Error:", error);
          toast.error(`AI generation failed: ${error.message}. Using template instead.`);
          contract = generateContract(contractDetails.type as string, formData);
        }
      } else {
        contract = generateContract(contractDetails.type as string, formData);
      }
      
      setGeneratedContract(contract);
      setCurrentStep(2);
    } catch (error) {
      toast.error('Error generating contract. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(0);
  };
  
  const getMissingFields = () => {
    if (!contractDetails.type) return [];
    
    const fields = CONTRACT_FIELDS[contractDetails.type].fields;
    const requiredFields = Object.entries(fields)
      .filter(([_, field]: [string, any]) => field.required)
      .map(([key, field]: [string, any]) => ({ key, label: field.label }));
      
    return requiredFields.filter(field => !formData[field.key]);
  };
  
  const renderAiPrompt = () => {
    if (!contractDetails.type) return null;
    
    const missingFields = getMissingFields();
    const contractTypeName = CONTRACT_FIELDS[contractDetails.type].type;
    
    return (
      <div className="glass-panel p-6 mb-8 animate-slide-in-up">
        <h3 className="text-lg font-medium mb-4">
          Great! You're drafting a <span className="font-bold">{contractTypeName}</span>
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">AI-powered generation:</span>
            <button 
              onClick={toggleUseAI}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${useAI ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span className={`${useAI ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
            </button>
          </div>
          <ApiKeyInput />
        </div>
        
        {missingFields.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Can you confirm the following details:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {missingFields.map((field) => (
                <li key={field.key}>{field.label}?</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  if (!contractFields) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <button
        onClick={handleBack}
        className="button-transition flex items-center gap-1 text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to contract types
      </button>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-2 animate-slide-in-up">
        {contractFields.type}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 animate-slide-in-up animation-delay-100">
        Please provide the details for your contract
      </p>
      
      {renderAiPrompt()}
      
      <div className="glass-panel p-6 animate-slide-in-up animation-delay-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {Object.entries(contractFields.fields).map(([key, field]: [string, any]) => (
            <div key={key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={field.placeholder || ''}
                  className="form-input"
                  required={field.required}
                />
              )}
              
              {field.type === 'number' && (
                <input
                  type="number"
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                  placeholder={field.placeholder || ''}
                  className="form-input"
                  required={field.required}
                />
              )}
              
              {field.type === 'select' && (
                <select
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="form-input"
                  required={field.required}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              
              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="form-input"
                  required={field.required}
                />
              )}
              
              {field.type === 'textarea' && (
                <textarea
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={field.placeholder || ''}
                  className="form-input h-24"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="button-transition flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>Generating<span className="loading">...</span></>
            ) : (
              <>Generate Contract <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractFormStep;

import { useEffect, useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { CONTRACT_FIELDS, generateContract, CONTRACT_TYPES } from '@/utils/contractTemplates';
import { ArrowLeft, ArrowRight, Download, Pen, Send } from 'lucide-react';
import { toast } from 'sonner';
import ContractTypeSelector from './ContractTypeSelector';

type ContractType = 'artist-manager' | 'record-label' | 'producer' | 'songwriter' | 'performance' | 'licensing' | 'distribution';

const ContractForm = () => {
  const { 
    contractDetails, 
    updateContractDetails, 
    setGeneratedContract,
    currentStep,
    setCurrentStep
  } = useContract();
  
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [contractFields, setContractFields] = useState<any>(null);
  const [contractText, setContractText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiRequesting, setIsAiRequesting] = useState(false);
  const [aiInput, setAiInput] = useState('');
  
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
  
  const handleSubmit = () => {
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
      const contract = generateContract(contractDetails.type as string, formData);
      setContractText(contract);
      setGeneratedContract(contract);
      setCurrentStep(2);
      setIsSubmitting(false);
    } catch (error) {
      toast.error('Error generating contract. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const handleAiRequest = () => {
    if (!aiInput.trim()) {
      toast.error('Please enter your contract request');
      return;
    }
    
    setIsAiRequesting(true);
    
    setTimeout(() => {
      let contractType: ContractType;
      let extractedDetails: {[key: string]: any} = {};
      
      const input = aiInput.toLowerCase();
      
      if (input.includes('manager') || input.includes('agent')) {
        contractType = 'artist-manager' as ContractType;
        
        const percentageMatch = input.match(/(\d+)%/);
        if (percentageMatch) {
          extractedDetails.percentage = parseInt(percentageMatch[1]);
        }
        
        const nameMatch = input.match(/between\s+([a-z\s]+)\s+and\s+([a-z\s]+)/i);
        if (nameMatch) {
          extractedDetails.artist = nameMatch[1].trim();
          extractedDetails.manager = nameMatch[2].trim();
        }
      } else if (input.includes('label') || input.includes('record')) {
        contractType = 'record-label' as ContractType;
      } else if (input.includes('producer')) {
        contractType = 'producer' as ContractType;
      } else if (input.includes('songwriter') || input.includes('writing')) {
        contractType = 'songwriter' as ContractType;
      } else if (input.includes('perform') || input.includes('gig') || input.includes('show')) {
        contractType = 'performance' as ContractType;
      } else if (input.includes('licens')) {
        contractType = 'licensing' as ContractType;
      } else if (input.includes('distribut')) {
        contractType = 'distribution' as ContractType;
      } else {
        contractType = 'artist-manager' as ContractType;
      }
      
      updateContractDetails({
        type: contractType,
        ...extractedDetails
      });
      
      setContractType(contractType);
      
      toast.success('AI analysis complete! Please fill in the remaining details.');
      setIsAiRequesting(false);
    }, 1500);
  };
  
  const handleBack = () => {
    setCurrentStep(0);
  };
  
  const setContractType = (type: ContractType) => {
    updateContractDetails({ type });
    setCurrentStep(1);
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
  
  if (currentStep === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-slide-in-up">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Describe Your Contract
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Tell us what you need, and our AI will help create the right contract
        </p>
        
        <div className="glass-panel p-6 mb-6">
          <textarea
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Example: I need a management contract for me and my agent, giving them 20% of my earnings for 2 years"
            className="w-full h-32 p-4 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition duration-200 mb-4"
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleAiRequest}
              disabled={isAiRequesting}
              className="button-transition flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:opacity-50"
            >
              {isAiRequesting ? (
                <>Analyzing<span className="loading">...</span></>
              ) : (
                <>Analyze Request <Send className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Or choose a contract type manually</p>
          <button
            onClick={() => setCurrentStep(0.5)}
            className="button-transition text-sm font-medium text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white underline"
          >
            Select contract type
          </button>
        </div>
      </div>
    );
  }
  
  if (currentStep === 0.5) {
    return <ContractTypeSelector />;
  }
  
  if (currentStep === 1) {
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
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentStep(1)}
        className="button-transition flex items-center gap-1 text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to form
      </button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-slide-in-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Your Contract</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Review your generated contract and make any necessary edits
          </p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            className="button-transition flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => {
              toast.info('Editing mode enabled. Make your changes in the text below.');
            }}
          >
            <Pen className="w-4 h-4" /> Edit
          </button>
          
          <button 
            className="button-transition flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80"
            onClick={() => {
              const blob = new Blob([contractText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${contractFields.type.replace(/\s+/g, '-').toLowerCase()}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              toast.success('Contract downloaded successfully!');
            }}
          >
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
      
      <div className="glass-panel p-6 overflow-auto animate-slide-in-up animation-delay-100">
        <div className="max-h-[70vh] overflow-y-auto pr-4 font-mono text-sm whitespace-pre-wrap">
          {contractText}
        </div>
      </div>
    </div>
  );
};

export default ContractForm;

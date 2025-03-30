
import { useEffect, useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { CONTRACT_FIELDS, generateContract, CONTRACT_TYPES } from '@/utils/contracts';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import OpenAIService from '@/utils/openai';
import ContractFormPrompt from './ContractFormPrompt';
import ContractFormFields from './ContractFormFields';
import ContractSubmitButton from './ContractSubmitButton';

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
      
      <ContractFormPrompt
        contractType={contractDetails.type}
        formData={formData}
        useAI={useAI}
        toggleUseAI={toggleUseAI}
      />
      
      <div className="glass-panel p-6 animate-slide-in-up animation-delay-200">
        <ContractFormFields
          fields={contractFields.fields}
          formData={formData}
          handleChange={handleChange}
        />
        
        <ContractSubmitButton
          onClick={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ContractFormStep;

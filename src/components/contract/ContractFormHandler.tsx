
import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { CONTRACT_FIELDS, generateContract } from '@/utils/contracts';
import { toast } from 'sonner';
import OpenAIService from '@/utils/openai';
import { CONTRACT_TYPES } from '@/utils/contracts';

interface ContractFormHandlerProps {
  children: React.ReactNode;
}

export const useContractFormHandler = () => {
  const { 
    contractDetails, 
    updateContractDetails, 
    setGeneratedContract,
    setCurrentStep,
    apiKey,
    useAI,
  } = useContract();
  
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [contractFields, setContractFields] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initForm = () => {
    if (contractDetails.type && CONTRACT_FIELDS[contractDetails.type]) {
      setContractFields(CONTRACT_FIELDS[contractDetails.type]);
      setFormData({...contractDetails});
    }
  };
  
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
      
      // Use AI if enabled and API key is available
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
  
  return {
    formData,
    contractFields,
    isSubmitting,
    initForm,
    handleChange,
    handleSubmit,
    handleBack
  };
};

const ContractFormHandler: React.FC<ContractFormHandlerProps> = ({ children }) => {
  return <>{children}</>;
};

export default ContractFormHandler;

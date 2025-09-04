
import { useEffect } from 'react';
import { useContract } from '@/context/ContractContext';
import { ArrowLeft } from 'lucide-react';
import ContractFormPrompt from './ContractFormPrompt';
import ContractFormFields from './ContractFormFields';
import ContractSubmitButton from './ContractSubmitButton';
import { useContractFormHandler } from './ContractFormHandler';

const ContractFormStep = () => {
  const { contractDetails } = useContract();
  
  const {
    formData,
    contractFields,
    isSubmitting,
    initForm,
    handleChange,
    handleSubmit,
    handleBack
  } = useContractFormHandler();
  
  useEffect(() => {
    initForm();
  }, [contractDetails]);
  
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

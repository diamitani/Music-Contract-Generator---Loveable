
import { useContract } from '@/context/ContractContext';
import ContractTypeSelector from './ContractTypeSelector';
import AiInputStep from './contract/AiInputStep';
import ContractFormStep from './contract/ContractFormStep';
import ContractPreviewStep from './contract/ContractPreviewStep';
import ContractUploader from './contract/ContractUploader';
import ContractAnalyzer from './contract/ContractAnalyzer';

const ContractForm = () => {
  const { currentStep } = useContract();
  
  // AI Input Step
  if (currentStep === 0) {
    return <AiInputStep />;
  }
  
  // Contract Type Selection
  if (currentStep === 0.5) {
    return <ContractTypeSelector />;
  }
  
  // Contract Upload Option
  if (currentStep === 0.75) {
    return <ContractUploader />;
  }
  
  // Contract Form Step
  if (currentStep === 1) {
    return <ContractFormStep />;
  }
  
  // Contract Preview Step
  if (currentStep === 2) {
    return <ContractPreviewStep />;
  }
  
  // Contract Analyzer Step
  if (currentStep === 3) {
    return <ContractAnalyzer />;
  }
  
  // Default fallback
  return <ContractTypeSelector />;
};

export default ContractForm;

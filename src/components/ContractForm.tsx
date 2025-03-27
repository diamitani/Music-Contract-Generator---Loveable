
import { useContract } from '@/context/ContractContext';
import ContractTypeSelector from './ContractTypeSelector';
import AiInputStep from './contract/AiInputStep';
import ContractFormStep from './contract/ContractFormStep';
import ContractPreviewStep from './contract/ContractPreviewStep';

const ContractForm = () => {
  const { currentStep } = useContract();
  
  if (currentStep === 0) {
    return <AiInputStep />;
  }
  
  if (currentStep === 0.5) {
    return <ContractTypeSelector />;
  }
  
  if (currentStep === 1) {
    return <ContractFormStep />;
  }
  
  return <ContractPreviewStep />;
};

export default ContractForm;

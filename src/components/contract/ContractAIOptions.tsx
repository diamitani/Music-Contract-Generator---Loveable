
import { useContract } from '@/context/ContractContext';
import ApiKeyInput from './ApiKeyInput';

type ContractAIOptionsProps = {
  useAI: boolean;
  toggleUseAI: () => void;
};

const ContractAIOptions = ({ useAI, toggleUseAI }: ContractAIOptionsProps) => {
  return (
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
  );
};

export default ContractAIOptions;


import { useContract } from '@/context/ContractContext';
import ApiKeyInput from './ApiKeyInput';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, ArrowRight, Upload } from 'lucide-react';

const AiInputStep = () => {
  const { hasApiKey, useAI, toggleUseAI, setCurrentStep } = useContract();

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Music Contract Generator</h2>

      {!hasApiKey && useAI && (
        <div className="glass-panel p-6 mb-8 animate-slide-in-up">
          <h3 className="text-xl font-semibold mb-4">Enter your OpenAI API Key</h3>
          <ApiKeyInput />
        </div>
      )}

      <div className="glass-panel p-6 mb-8 animate-slide-in-up animation-delay-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">AI-Powered Contract Generation</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {useAI ? 'Enabled' : 'Disabled'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={useAI}
                onChange={toggleUseAI}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <LightbulbIcon className="text-blue-500 h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {useAI 
                ? "Our AI will generate a professional contract based on your inputs. An OpenAI API key is required for this feature." 
                : "AI generation is currently disabled. You'll be able to create a contract by filling out a form manually."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Button 
            onClick={() => setCurrentStep(0.5)}
            className="h-auto py-6 flex flex-col items-center justify-center space-y-2"
          >
            <ArrowRight className="h-6 w-6 mb-2" />
            <span className="text-lg font-medium">Create New Contract</span>
            <span className="text-sm opacity-80">Generate a new contract from scratch</span>
          </Button>
          
          <Button 
            onClick={() => setCurrentStep(0.75)}
            variant="outline"
            className="h-auto py-6 flex flex-col items-center justify-center space-y-2"
          >
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-lg font-medium">Upload Contract</span>
            <span className="text-sm opacity-80">Upload an existing contract to analyze or edit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiInputStep;

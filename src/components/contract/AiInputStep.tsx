
import { useContract } from '@/context/ContractContext';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, ArrowRight, Upload } from 'lucide-react';

const AiInputStep = () => {
  const { setCurrentStep } = useContract();

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Music Contract Generator</h2>

      <div className="glass-panel p-6 mb-8 animate-slide-in-up animation-delay-100">
        <h3 className="text-xl font-semibold mb-4">AI-Powered Contract Generation</h3>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6 flex items-start space-x-3">
          <LightbulbIcon className="text-blue-500 h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Our AI will generate a professional contract tailored to your needs. Simply provide your requirements and get a legally sound contract in minutes.
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

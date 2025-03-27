
import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

type ContractType = 'artist-manager' | 'record-label' | 'producer' | 'songwriter' | 'performance' | 'licensing' | 'distribution';

const AiInputStep = () => {
  const { updateContractDetails, setCurrentStep } = useContract();
  const [isAiRequesting, setIsAiRequesting] = useState(false);
  const [aiInput, setAiInput] = useState('');

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

  const setContractType = (type: ContractType) => {
    updateContractDetails({ type });
    setCurrentStep(1);
  };

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
};

export default AiInputStep;

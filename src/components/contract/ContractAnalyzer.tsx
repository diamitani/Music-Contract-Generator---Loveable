
import React, { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { analyzeContract, AnalyzedTerm } from '@/utils/contractAnalyzer';
import { toast } from 'sonner';
import { AlertTriangle, FileText, Book, ArrowLeft } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ContractAnalyzer = () => {
  const { 
    apiKey, 
    hasApiKey, 
    uploadedContract, 
    analyzedTerms,
    setAnalyzedTerms,
    isAnalyzing,
    setIsAnalyzing,
    setCurrentStep,
    generatedContract
  } = useContract();
  
  const contractText = uploadedContract || generatedContract || '';

  const handleAnalyzeContract = async () => {
    if (!hasApiKey) {
      toast.error("An OpenAI API key is required to analyze contracts");
      setCurrentStep(0); // Go to API key input
      return;
    }

    if (!contractText) {
      toast.error("No contract found to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      if (!apiKey) throw new Error("API key is required");
      
      const terms = await analyzeContract(contractText, apiKey);
      setAnalyzedTerms(terms);
      toast.success("Contract analysis complete");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze the contract. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={() => setCurrentStep(2)} // Go back to preview
        className="button-transition flex items-center gap-1 text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to contract
      </button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Contract Analysis</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Understand your contract terms in simple language
          </p>
        </div>
        
        {!isAnalyzing && !analyzedTerms && (
          <Button 
            onClick={handleAnalyzeContract}
            className="mt-4 md:mt-0"
          >
            <Book className="w-4 h-4 mr-2" />
            Analyze Contract
          </Button>
        )}
      </div>
      
      <div className="glass-panel p-6 overflow-auto">
        {isAnalyzing && (
          <div className="space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-300">
              Analyzing your contract...
            </p>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!isAnalyzing && !analyzedTerms && (
          <div className="flex flex-col items-center justify-center space-y-4 py-10">
            <FileText className="w-16 h-16 text-gray-400" />
            <h3 className="text-xl font-medium">Ready to analyze your contract</h3>
            <p className="text-center max-w-md text-gray-600 dark:text-gray-300">
              Click the "Analyze Contract" button to break down the contract terms into simple, 
              easy-to-understand explanations.
            </p>
          </div>
        )}
        
        {!isAnalyzing && analyzedTerms && analyzedTerms.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-400">Disclaimer</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  This analysis is provided for informational purposes only and is not legal advice. 
                  We recommend consulting with a qualified attorney before signing any legal agreement.
                </p>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {analyzedTerms.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-medium text-left">
                    {item.term}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {item.explanation}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalyzer;

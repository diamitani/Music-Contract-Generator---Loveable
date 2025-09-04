
import React, { createContext, useContext, useState } from 'react';
import { ContractType } from '@/utils/contracts/types';

interface ContractDetails {
  type: ContractType | null;
  artist: string;
  counterparty: string;
  percentage: number;
  term: number;
  state: string;
  additionalTerms: string;
  [key: string]: any; // For dynamic fields
}

interface ContractContextType {
  contractDetails: ContractDetails;
  updateContractDetails: (details: Partial<ContractDetails>) => void;
  resetContractDetails: () => void;
  setContractType: (type: ContractType) => void;
  generatedContract: string | null;
  setGeneratedContract: (contract: string | null) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  apiKey: string;
  uploadedContract: string | null;
  setUploadedContract: (contract: string | null) => void;
  analyzedTerms: Array<{ term: string; explanation: string }> | null;
  setAnalyzedTerms: (terms: Array<{ term: string; explanation: string }> | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

// Default API key and assistant ID provided by the site owner
const DEFAULT_API_KEY = "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";
export const DEFAULT_ASSISTANT_ID = "asst_2pLwzgKk6weEjPN1u3qMEaDq";

const defaultContractDetails: ContractDetails = {
  type: null,
  artist: '',
  counterparty: '',
  percentage: 15,
  term: 12,
  state: '',
  additionalTerms: '',
};

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('ContractProvider rendering');
  const [contractDetails, setContractDetails] = useState<ContractDetails>(defaultContractDetails);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedContract, setUploadedContract] = useState<string | null>(null);
  const [analyzedTerms, setAnalyzedTerms] = useState<Array<{ term: string; explanation: string }> | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const updateContractDetails = (details: Partial<ContractDetails>) => {
    setContractDetails(prev => ({ ...prev, ...details }));
  };

  const resetContractDetails = () => {
    setContractDetails(defaultContractDetails);
    setGeneratedContract(null);
    setUploadedContract(null);
    setAnalyzedTerms(null);
  };

  const setContractType = (type: ContractType) => {
    setContractDetails(prev => ({ ...prev, type }));
  };

  // Always use the default API key
  const apiKey = DEFAULT_API_KEY;

  return (
    <ContractContext.Provider value={{
      contractDetails,
      updateContractDetails,
      resetContractDetails,
      setContractType,
      generatedContract,
      setGeneratedContract,
      currentStep,
      setCurrentStep,
      apiKey,
      uploadedContract,
      setUploadedContract,
      analyzedTerms,
      setAnalyzedTerms,
      isAnalyzing,
      setIsAnalyzing
    }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = (): ContractContextType => {
  console.log('useContract called');
  const context = useContext(ContractContext);
  console.log('context value:', context);
  if (context === undefined) {
    console.error('useContract called outside of ContractProvider!');
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

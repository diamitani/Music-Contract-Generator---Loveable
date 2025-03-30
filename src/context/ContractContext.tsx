
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
  apiKey: string | null;
  updateApiKey: (key: string) => void;
  hasApiKey: boolean;
  useAI: boolean;
  toggleUseAI: () => void;
  uploadedContract: string | null;
  setUploadedContract: (contract: string | null) => void;
  analyzedTerms: Array<{ term: string; explanation: string }> | null;
  setAnalyzedTerms: (terms: Array<{ term: string; explanation: string }> | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

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
  const [contractDetails, setContractDetails] = useState<ContractDetails>(defaultContractDetails);
  const [generatedContract, setGeneratedContract] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [apiKey, setApiKey] = useState<string | null>(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    return savedKey || null;
  });
  const [useAI, setUseAI] = useState<boolean>(() => {
    return localStorage.getItem('use_ai') === 'true';
  });
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

  const updateApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
  };

  const toggleUseAI = () => {
    const newValue = !useAI;
    setUseAI(newValue);
    localStorage.setItem('use_ai', String(newValue));
  };

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
      updateApiKey,
      hasApiKey: Boolean(apiKey),
      useAI,
      toggleUseAI,
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
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

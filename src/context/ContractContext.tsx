
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
  useDefaultApiKey: boolean;
  toggleUseDefaultApiKey: () => void;
}

// Default API key provided by the site owner
const DEFAULT_API_KEY = "sk-svcacct-zL_TFd0L60HxVz6aGemkIf9b53Tgjaiyy6msVd3N-Ia_xBmEc9guLxdcYCMT3BlbkFJoG4SeRAEhx0SfhCATepQFh40CxmeqpXdHtljnWHQfNvWGhYQoIYUP11vM5wA";

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
    return localStorage.getItem('use_ai') === 'true' || true; // Default to true
  });
  const [useDefaultApiKey, setUseDefaultApiKey] = useState<boolean>(() => {
    return localStorage.getItem('use_default_api_key') !== 'false'; // Default to true
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

  const toggleUseDefaultApiKey = () => {
    const newValue = !useDefaultApiKey;
    setUseDefaultApiKey(newValue);
    localStorage.setItem('use_default_api_key', String(newValue));
  };

  // Compute the effective API key based on user preference
  const effectiveApiKey = useDefaultApiKey ? DEFAULT_API_KEY : apiKey;
  const hasApiKey = Boolean(effectiveApiKey);

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
      apiKey: effectiveApiKey,
      updateApiKey,
      hasApiKey,
      useAI,
      toggleUseAI,
      uploadedContract,
      setUploadedContract,
      analyzedTerms,
      setAnalyzedTerms,
      isAnalyzing,
      setIsAnalyzing,
      useDefaultApiKey,
      toggleUseDefaultApiKey
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

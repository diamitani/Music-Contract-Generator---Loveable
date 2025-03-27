
import React, { createContext, useContext, useState } from 'react';

type ContractType = 
  | 'artist-manager' 
  | 'record-label' 
  | 'producer' 
  | 'songwriter' 
  | 'performance' 
  | 'licensing' 
  | 'distribution';

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

  const updateContractDetails = (details: Partial<ContractDetails>) => {
    setContractDetails(prev => ({ ...prev, ...details }));
  };

  const resetContractDetails = () => {
    setContractDetails(defaultContractDetails);
    setGeneratedContract(null);
  };

  const setContractType = (type: ContractType) => {
    setContractDetails(prev => ({ ...prev, type }));
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
      setCurrentStep
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

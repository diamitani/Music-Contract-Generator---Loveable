
import React from 'react';
import { CONTRACT_FIELDS } from '@/utils/contracts';

type MissingField = {
  key: string;
  label: string;
};

type ContractFormPromptProps = {
  contractType: string | null;
  formData: Record<string, any>;
};

const ContractFormPrompt = ({ contractType, formData }: ContractFormPromptProps) => {
  if (!contractType) return null;
  
  const getMissingFields = () => {
    const fields = CONTRACT_FIELDS[contractType].fields;
    const requiredFields = Object.entries(fields)
      .filter(([_, field]: [string, any]) => field.required)
      .map(([key, field]: [string, any]) => ({ key, label: field.label }));
      
    return requiredFields.filter(field => !formData[field.key]);
  };
  
  const missingFields = getMissingFields();
  const contractTypeName = CONTRACT_FIELDS[contractType].type;
  
  return (
    <div className="glass-panel p-6 mb-8 animate-slide-in-up">
      <h3 className="text-lg font-medium mb-4">
        Great! You're drafting a <span className="font-bold">{contractTypeName}</span>
      </h3>
      
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          ✨ AI-powered generation enabled. Your contract will be professionally crafted based on your inputs.
        </p>
      </div>
      
      {missingFields.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Can you confirm the following details:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            {missingFields.map((field) => (
              <li key={field.key}>{field.label}?</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContractFormPrompt;

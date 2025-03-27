
export type ContractType = 
  | 'artist-manager' 
  | 'record-label' 
  | 'producer' 
  | 'songwriter' 
  | 'performance' 
  | 'licensing' 
  | 'distribution';

export interface ContractRequiredFields {
  type: string;
  fields: {
    [key: string]: {
      label: string;
      type: 'text' | 'number' | 'select' | 'textarea' | 'date';
      required: boolean;
      placeholder?: string;
      options?: { value: string; label: string }[];
    };
  };
}

export interface ContractTypeDefinition {
  id: ContractType;
  name: string;
  description: string;
  icon: string;
}

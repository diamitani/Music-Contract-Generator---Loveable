
import { ContractRequiredFields } from '../types';

export const artistManagerFields: ContractRequiredFields = {
  type: 'Artist-Manager Agreement',
  fields: {
    artist: {
      label: 'Artist Full Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., John Smith',
    },
    artistAddress: {
      label: 'Artist Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    manager: {
      label: 'Manager Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Jane Doe',
    },
    managerAddress: {
      label: 'Manager Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    percentage: {
      label: 'Commission Percentage',
      type: 'number',
      required: true,
      placeholder: '15',
    },
    term: {
      label: 'Contract Term (months)',
      type: 'number',
      required: true,
      placeholder: '12',
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., California',
    },
    additionalTerms: {
      label: 'Additional Terms',
      type: 'textarea',
      required: false,
      placeholder: 'Any additional terms or conditions...',
    },
  },
};

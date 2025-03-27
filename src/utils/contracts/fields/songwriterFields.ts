
import { ContractRequiredFields } from '../types';

export const songwriterFields: ContractRequiredFields = {
  type: 'Songwriter Agreement',
  fields: {
    songwriter: {
      label: 'Songwriter Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Lyric Master',
    },
    client: {
      label: 'Client Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., John Smith or Record Label',
    },
    songCount: {
      label: 'Number of Songs',
      type: 'number',
      required: true,
      placeholder: '5',
    },
    publishingRights: {
      label: 'Publishing Rights',
      type: 'select',
      required: true,
      options: [
        { value: 'full', label: 'Full transfer to client' },
        { value: 'shared', label: 'Shared 50/50' },
        { value: 'songwriter', label: 'Songwriter retains rights' },
      ],
    },
    paymentStructure: {
      label: 'Payment Structure',
      type: 'select',
      required: true,
      options: [
        { value: 'flat', label: 'Flat fee' },
        { value: 'royalty', label: 'Royalty-based' },
        { value: 'hybrid', label: 'Hybrid (flat fee + royalty)' },
      ],
    },
    flatFeeAmount: {
      label: 'Flat Fee Amount ($)',
      type: 'number',
      required: false,
      placeholder: '1000',
    },
    royaltyPercentage: {
      label: 'Royalty Percentage',
      type: 'number',
      required: false,
      placeholder: '5',
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., California',
    },
  },
};

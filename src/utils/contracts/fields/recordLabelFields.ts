
import { ContractRequiredFields } from '../types';

export const recordLabelFields: ContractRequiredFields = {
  type: 'Record Label Contract',
  fields: {
    artist: {
      label: 'Artist/Band Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., The Sound Waves',
    },
    artistAddress: {
      label: 'Artist Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    label: {
      label: 'Record Label Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Epic Records',
    },
    labelAddress: {
      label: 'Label Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    albumCount: {
      label: 'Number of Albums',
      type: 'number',
      required: true,
      placeholder: '3',
    },
    royaltyRate: {
      label: 'Royalty Rate (%)',
      type: 'number',
      required: true,
      placeholder: '12',
    },
    advanceAmount: {
      label: 'Advance Amount ($)',
      type: 'number',
      required: true,
      placeholder: '25000',
    },
    term: {
      label: 'Contract Term (years)',
      type: 'number',
      required: true,
      placeholder: '3',
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., New York',
    },
    additionalTerms: {
      label: 'Additional Terms',
      type: 'textarea',
      required: false,
      placeholder: 'Any additional terms or conditions...',
    },
  },
};

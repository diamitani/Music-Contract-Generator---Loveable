
import { ContractRequiredFields } from '../types';

export const producerFields: ContractRequiredFields = {
  type: 'Producer Agreement',
  fields: {
    artist: {
      label: 'Artist Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., John Smith',
    },
    producer: {
      label: 'Producer Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Beat Master',
    },
    producerAddress: {
      label: 'Producer Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    projectName: {
      label: 'Project Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Summer Album',
    },
    trackCount: {
      label: 'Number of Tracks',
      type: 'number',
      required: true,
      placeholder: '10',
    },
    feePerTrack: {
      label: 'Fee Per Track ($)',
      type: 'number',
      required: true,
      placeholder: '2000',
    },
    royaltyPercentage: {
      label: 'Royalty Percentage',
      type: 'number',
      required: true,
      placeholder: '3',
    },
    completionDate: {
      label: 'Expected Completion Date',
      type: 'date',
      required: true,
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., Tennessee',
    },
  },
};

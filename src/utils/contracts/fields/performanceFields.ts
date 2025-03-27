
import { ContractRequiredFields } from '../types';

export const performanceFields: ContractRequiredFields = {
  type: 'Performance Contract',
  fields: {
    artist: {
      label: 'Artist/Band Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., The Sound Waves',
    },
    venue: {
      label: 'Venue Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Madison Square Garden',
    },
    venueAddress: {
      label: 'Venue Address',
      type: 'text',
      required: true,
      placeholder: 'Full address',
    },
    venueContact: {
      label: 'Venue Contact Person',
      type: 'text',
      required: true,
      placeholder: 'e.g., Venue Manager',
    },
    performanceDate: {
      label: 'Performance Date',
      type: 'date',
      required: true,
    },
    performanceTime: {
      label: 'Performance Time',
      type: 'text',
      required: true,
      placeholder: 'e.g., 8:00 PM',
    },
    duration: {
      label: 'Performance Duration (minutes)',
      type: 'number',
      required: true,
      placeholder: '90',
    },
    fee: {
      label: 'Performance Fee ($)',
      type: 'number',
      required: true,
      placeholder: '5000',
    },
    depositRequired: {
      label: 'Deposit Required (%)',
      type: 'number',
      required: true,
      placeholder: '50',
    },
    soundCheckTime: {
      label: 'Sound Check Time',
      type: 'text',
      required: true,
      placeholder: 'e.g., 4:00 PM',
    },
    specialRequirements: {
      label: 'Special Requirements',
      type: 'textarea',
      required: false,
      placeholder: 'Equipment, hospitality, etc.',
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., New York',
    },
  },
};

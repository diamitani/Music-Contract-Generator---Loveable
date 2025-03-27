
import { ContractRequiredFields } from '../types';

export const distributionFields: ContractRequiredFields = {
  type: 'Distribution Agreement',
  fields: {
    artist: {
      label: 'Artist/Label Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Artist or Independent Label Name',
    },
    distributor: {
      label: 'Distributor Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., DistroKid, CD Baby, TuneCore',
    },
    contentType: {
      label: 'Content Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'ep', label: 'EP' },
        { value: 'album', label: 'Album' },
        { value: 'catalog', label: 'Entire Catalog' },
      ],
    },
    releaseTitle: {
      label: 'Release Title',
      type: 'text',
      required: true,
      placeholder: 'Title of the release',
    },
    distributionType: {
      label: 'Distribution Type',
      type: 'select',
      required: true,
      options: [
        { value: 'digital', label: 'Digital Only' },
        { value: 'physical', label: 'Physical Only' },
        { value: 'both', label: 'Digital and Physical' },
      ],
    },
    territory: {
      label: 'Territory',
      type: 'select',
      required: true,
      options: [
        { value: 'worldwide', label: 'Worldwide' },
        { value: 'custom', label: 'Custom Territory' },
      ],
    },
    customTerritory: {
      label: 'Custom Territory Details',
      type: 'text',
      required: false,
      placeholder: 'Specify if custom territory selected',
    },
    term: {
      label: 'Agreement Term (years)',
      type: 'number',
      required: true,
      placeholder: '2',
    },
    revenueShare: {
      label: 'Artist Revenue Share (%)',
      type: 'number',
      required: true,
      placeholder: '80',
    },
    exclusivity: {
      label: 'Exclusivity',
      type: 'select',
      required: true,
      options: [
        { value: 'exclusive', label: 'Exclusive' },
        { value: 'non-exclusive', label: 'Non-exclusive' },
      ],
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., California',
    },
  },
};

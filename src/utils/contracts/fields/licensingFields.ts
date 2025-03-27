
import { ContractRequiredFields } from '../types';

export const licensingFields: ContractRequiredFields = {
  type: 'Music Licensing Agreement',
  fields: {
    licensor: {
      label: 'Licensor Name',
      type: 'text',
      required: true,
      placeholder: 'Artist or Rights Holder Name',
    },
    licensee: {
      label: 'Licensee Name',
      type: 'text',
      required: true,
      placeholder: 'Company or Individual licensing the music',
    },
    workTitle: {
      label: 'Work Title',
      type: 'text',
      required: true,
      placeholder: 'Song or Composition Title',
    },
    useType: {
      label: 'Type of Use',
      type: 'select',
      required: true,
      options: [
        { value: 'film', label: 'Film/Movie' },
        { value: 'tv', label: 'Television' },
        { value: 'commercial', label: 'Commercial Advertisement' },
        { value: 'video-game', label: 'Video Game' },
        { value: 'website', label: 'Website/Online' },
      ],
    },
    licenseType: {
      label: 'License Type',
      type: 'select',
      required: true,
      options: [
        { value: 'exclusive', label: 'Exclusive' },
        { value: 'non-exclusive', label: 'Non-exclusive' },
      ],
    },
    territory: {
      label: 'Territory',
      type: 'select',
      required: true,
      options: [
        { value: 'worldwide', label: 'Worldwide' },
        { value: 'north-america', label: 'North America' },
        { value: 'europe', label: 'Europe' },
        { value: 'asia', label: 'Asia' },
        { value: 'custom', label: 'Custom Territory' },
      ],
    },
    customTerritory: {
      label: 'Custom Territory Details',
      type: 'text',
      required: false,
      placeholder: 'Specify if custom territory selected',
    },
    duration: {
      label: 'License Duration (months)',
      type: 'number',
      required: true,
      placeholder: '12',
    },
    fee: {
      label: 'License Fee ($)',
      type: 'number',
      required: true,
      placeholder: '5000',
    },
    state: {
      label: 'Governing State',
      type: 'text',
      required: true,
      placeholder: 'e.g., California',
    },
  },
};

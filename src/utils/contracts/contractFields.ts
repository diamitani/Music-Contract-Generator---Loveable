
import { ContractRequiredFields } from './types';
import { artistManagerFields } from './fields/artistManagerFields';
import { recordLabelFields } from './fields/recordLabelFields';
import { producerFields } from './fields/producerFields';
import { songwriterFields } from './fields/songwriterFields';
import { performanceFields } from './fields/performanceFields';
import { licensingFields } from './fields/licensingFields';
import { distributionFields } from './fields/distributionFields';

export const CONTRACT_FIELDS: { [key: string]: ContractRequiredFields } = {
  'artist-manager': artistManagerFields,
  'record-label': recordLabelFields,
  'producer': producerFields,
  'songwriter': songwriterFields,
  'performance': performanceFields,
  'licensing': licensingFields,
  'distribution': distributionFields,
};

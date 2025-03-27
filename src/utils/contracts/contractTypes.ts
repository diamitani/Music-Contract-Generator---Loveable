
import { ContractTypeDefinition } from './types';

export const CONTRACT_TYPES: ContractTypeDefinition[] = [
  {
    id: 'artist-manager',
    name: 'Artist-Manager Agreement',
    description: 'Contract between an artist and their manager outlining roles, responsibilities, and compensation.',
    icon: 'UserRoundCog',
  },
  {
    id: 'record-label',
    name: 'Record Label Contract',
    description: 'Agreement between an artist and a record label for recording, production, and distribution.',
    icon: 'Disc',
  },
  {
    id: 'producer',
    name: 'Producer Agreement',
    description: 'Contract between an artist and a producer outlining production services and payment terms.',
    icon: 'MusicNote',
  },
  {
    id: 'songwriter',
    name: 'Songwriter Agreement',
    description: 'Contract for songwriting services, addressing copyright ownership and royalties.',
    icon: 'PenTool',
  },
  {
    id: 'performance',
    name: 'Performance Contract',
    description: 'Agreement for live performances, detailing venue, payment, and requirements.',
    icon: 'Mic2',
  },
  {
    id: 'licensing',
    name: 'Music Licensing Agreement',
    description: 'Contract for licensing music for commercial use, such as in film, TV, or advertising.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 'distribution',
    name: 'Distribution Agreement',
    description: 'Contract for digital or physical distribution of music through various platforms.',
    icon: 'Share2',
  },
];

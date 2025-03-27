
import { generateArtistManagerContract } from './templates/artistManagerTemplate';
import { generateRecordLabelContract } from './templates/recordLabelTemplate';

export const generateContract = (type: string, details: any): string => {
  switch (type) {
    case 'artist-manager':
      return generateArtistManagerContract(details);
      
    case 'record-label':
      return generateRecordLabelContract(details);
      
    // Add additional contract type templates as needed
    
    default:
      return 'Contract generation error. Please select a valid contract type.';
  }
};

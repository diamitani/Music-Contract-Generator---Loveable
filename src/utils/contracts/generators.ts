
import { generateArtistManagerContract } from './templates/artistManagerTemplate';
import { generateRecordLabelContract } from './templates/recordLabelTemplate';
import { ContractTemplateService } from '@/services/contractTemplateService';

export const generateContract = async (type: string, details: any): Promise<string> => {
  // First try to get template from Supabase storage
  const templates = await ContractTemplateService.getTemplatesByType(type);
  
  if (templates.length > 0) {
    const template = templates[0]; // Use the first matching template
    const templateContent = await ContractTemplateService.getTemplateContent(template.name);
    
    if (templateContent) {
      return `${templateContent}

Contract Details:
Artist: ${details.artist}
Counterparty: ${details.counterparty}
Percentage: ${details.percentage}%
Term: ${details.term} months
State: ${details.state}
${details.additionalTerms ? `Additional Terms: ${details.additionalTerms}` : ''}

Template Source: ${template.name}
Generated on: ${new Date().toLocaleDateString()}`;
    }
  }
  
  // Fallback to hardcoded templates if no Supabase template found
  switch (type) {
    case 'artist-manager':
      return generateArtistManagerContract(details);
      
    case 'record-label':
      return generateRecordLabelContract(details);
      
    default:
      return 'Contract generation error. Please select a valid contract type.';
  }
};

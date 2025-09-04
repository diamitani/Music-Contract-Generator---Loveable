import { supabase } from '@/integrations/supabase/client';

export interface ContractTemplate {
  id: string;
  name: string;
  type: string;
  content?: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export class ContractTemplateService {
  private static getTemplateTypeFromName(name: string): string {
    const nameUpper = name.toUpperCase();
    
    if (nameUpper.includes('SONGWRITER')) return 'songwriter';
    if (nameUpper.includes('PRODUCER')) return 'producer';
    if (nameUpper.includes('LICENSING')) return 'licensing';
    if (nameUpper.includes('LABEL')) return 'record-label';
    if (nameUpper.includes('DISTRIBUTION')) return 'distribution';
    if (nameUpper.includes('PERFORMANCE')) return 'performance';
    if (nameUpper.includes('MANAGEMENT') || nameUpper.includes('MANAGER')) return 'artist-manager';
    if (nameUpper.includes('SPLIT')) return 'split-sheet';
    if (nameUpper.includes('COPYRIGHT')) return 'copyright';
    if (nameUpper.includes('STUDIO')) return 'studio';
    if (nameUpper.includes('WORK-FOR-HIRE')) return 'work-for-hire';
    if (nameUpper.includes('TALENT')) return 'talent';
    if (nameUpper.includes('PRODUCTION')) return 'production';
    
    return 'general';
  }

  static async getAllTemplates(): Promise<ContractTemplate[]> {
    try {
      const { data, error } = await supabase.storage
        .from('Contracts')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (error) {
        console.error('Error fetching templates:', error);
        return [];
      }

      return data.map(file => ({
        id: file.id || file.name,
        name: file.name,
        type: this.getTemplateTypeFromName(file.name),
        metadata: file.metadata,
        created_at: file.created_at,
        updated_at: file.updated_at
      }));
    } catch (error) {
      console.error('Error fetching templates:', error);
      return [];
    }
  }

  static async getTemplateContent(templateName: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from('Contracts')
        .download(templateName);

      if (error) {
        console.error('Error downloading template:', error);
        return null;
      }

      // For now, return a placeholder since we can't parse Word documents directly
      // In a production app, you'd want to use a service to convert Word docs to text
      return `Template: ${templateName}\n\nThis template will be processed and populated with your contract details.\n\nPlease note: This is a placeholder. In production, the actual Word document content would be parsed and processed here.`;
    } catch (error) {
      console.error('Error downloading template:', error);
      return null;
    }
  }

  static async getTemplatesByType(type: string): Promise<ContractTemplate[]> {
    const allTemplates = await this.getAllTemplates();
    return allTemplates.filter(template => template.type === type);
  }

  static async getTemplatePublicUrl(templateName: string): Promise<string | null> {
    try {
      const { data } = supabase.storage
        .from('Contracts')
        .getPublicUrl(templateName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error getting public URL:', error);
      return null;
    }
  }
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Music, Users, Handshake, Mic, Headphones, Star, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContractTemplateService, ContractTemplate } from '@/services/contractTemplateService';

const contractTypes = [
  {
    id: 'artist-manager',
    title: 'Artist Manager Agreement',
    description: 'Partnership contracts between artists and their management teams',
    icon: Users,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'record-label',
    title: 'Record Label Deal',
    description: 'Recording and distribution agreements with record labels',
    icon: Music,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'licensing',
    title: 'Music Licensing',
    description: 'License music for films, TV, commercials, and other media',
    icon: FileText,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'performance',
    title: 'Performance Agreement',
    description: 'Live performance contracts for venues and events',
    icon: Mic,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'producer',
    title: 'Producer Agreement',
    description: 'Collaboration contracts with music producers',
    icon: Headphones,
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'songwriter',
    title: 'Songwriter Agreement',
    description: 'Publishing and collaboration agreements for songwriters',
    icon: Star,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'distribution',
    title: 'Distribution Deal',
    description: 'Digital and physical distribution agreements',
    icon: Handshake,
    color: 'from-teal-500 to-green-500'
  }
];

const getIconForType = (type: string) => {
  switch (type) {
    case 'record-label':
    case 'label':
      return Music;
    case 'artist-manager':
    case 'management':
      return Users;
    case 'producer':
    case 'production':
      return Headphones;
    case 'songwriter':
      return Star;
    case 'performance':
    case 'talent':
      return Mic;
    case 'licensing':
    case 'copyright':
      return FileText;
    case 'distribution':
      return Handshake;
    default:
      return FileText;
  }
};

const getColorForType = (type: string) => {
  switch (type) {
    case 'record-label':
    case 'label':
      return 'from-purple-500 to-pink-500';
    case 'artist-manager':
    case 'management':
      return 'from-blue-500 to-cyan-500';
    case 'producer':
    case 'production':
      return 'from-indigo-500 to-blue-500';
    case 'songwriter':
      return 'from-yellow-500 to-orange-500';
    case 'performance':
    case 'talent':
      return 'from-orange-500 to-red-500';
    case 'licensing':
    case 'copyright':
      return 'from-green-500 to-emerald-500';
    case 'distribution':
      return 'from-teal-500 to-green-500';
    default:
      return 'from-gray-500 to-slate-500';
  }
};

const ContractTemplateCards = () => {
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const supabaseTemplates = await ContractTemplateService.getAllTemplates();
        setTemplates(supabaseTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const handleDownloadTemplate = async (templateName: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = await ContractTemplateService.getTemplatePublicUrl(templateName);
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Contract Templates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loading templates from your Supabase storage...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-panel p-6 animate-pulse">
                <div className="w-12 h-12 rounded-lg bg-gray-300 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Contract Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive library of music industry contract templates, 
            sourced from your Supabase storage and designed to protect your interests.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template, index) => {
            const IconComponent = getIconForType(template.type);
            const color = getColorForType(template.type);
            
            return (
              <div
                key={template.id}
                className="group glass-panel p-6 hover-scale cursor-pointer animate-slide-in-up relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {template.name.replace(/\.(doc|docx)$/, '').replace(/^MUSIC CONTRACT _ |^LABEL CONTRACT _ /, '')}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Professional {template.type.replace('-', ' ')} template ready for customization
                </p>

                <Badge variant="secondary" className="mb-4">
                  {template.type}
                </Badge>
                
                <div className="space-y-2">
                  <Link 
                    to="/generate" 
                    className="block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 button-transition"
                  >
                    Generate Contract →
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => handleDownloadTemplate(template.name, e)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/generate" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:scale-105 button-transition"
          >
            Start Creating Your Contract
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplateCards;
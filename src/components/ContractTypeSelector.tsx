
import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { CONTRACT_TYPES } from '@/utils/contracts';
import { UserRoundCog, Disc, PenTool, Mic2, FileSpreadsheet, Share2, Music } from 'lucide-react';
import ContractTypeFAQ from './contract/ContractTypeFAQ';

const ContractTypeSelector = () => {
  const { setContractType, setCurrentStep } = useContract();
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [selectedForFAQ, setSelectedForFAQ] = useState<string | null>(null);

  const handleSelectType = (typeId: any) => {
    setContractType(typeId);
    setCurrentStep(1);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserRoundCog': return <UserRoundCog className="w-6 h-6" />;
      case 'Disc': return <Disc className="w-6 h-6" />;
      case 'MusicNote': return <Music className="w-6 h-6" />;
      case 'PenTool': return <PenTool className="w-6 h-6" />;
      case 'Mic2': return <Mic2 className="w-6 h-6" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      default: return <Music className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 animate-slide-in-up">
        Select Contract Type
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8 animate-slide-in-up animation-delay-100">
        Choose the type of music agreement that best fits your needs
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in-up animation-delay-200">
        {CONTRACT_TYPES.map((type, index) => (
          <div key={type.id} className="flex flex-col">
            <button
              onClick={() => handleSelectType(type.id)}
              onMouseEnter={() => setHoveredType(type.id)}
              onMouseLeave={() => setHoveredType(null)}
              className="glass-panel p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none group relative overflow-hidden flex-grow"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-full bg-black/5 dark:bg-white/10 mr-4">
                  {getIcon(type.icon)}
                </div>
                <h3 className="text-lg font-medium">{type.name}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {type.description}
              </p>
              
              <div className="mt-4 flex justify-end">
                <span className="text-xs font-medium text-black/60 dark:text-white/60 transition-colors duration-300 group-hover:text-black dark:group-hover:text-white">
                  Select →
                </span>
              </div>
            </button>
            
            <button 
              onClick={() => setSelectedForFAQ(selectedForFAQ === type.id ? null : type.id)}
              className="mt-2 text-xs text-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              {selectedForFAQ === type.id ? "Hide FAQs" : "View FAQs"}
            </button>
            
            {selectedForFAQ === type.id && (
              <ContractTypeFAQ contractType={type.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTypeSelector;

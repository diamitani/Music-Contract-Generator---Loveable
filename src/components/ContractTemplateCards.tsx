import { Link } from 'react-router-dom';
import { FileText, Music, Users, Handshake, Mic, Headphones, Star } from 'lucide-react';

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

const ContractTemplateCards = () => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional Contract Templates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive library of music industry contract templates, 
            each designed to protect your interests and streamline your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contractTypes.map((contract, index) => {
            const IconComponent = contract.icon;
            return (
              <Link
                key={contract.id}
                to="/generate"
                className="group glass-panel p-6 hover-scale cursor-pointer animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${contract.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {contract.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {contract.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-xs font-medium text-primary">
                    Create Contract →
                  </span>
                </div>
              </Link>
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
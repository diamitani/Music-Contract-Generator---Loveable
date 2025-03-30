
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContractType } from "@/utils/contracts/types";
import { X } from "lucide-react";

interface ContractTypeFAQProps {
  contractType: string;
  open: boolean;
  onClose: () => void;
}

const FAQ_DATA: Record<ContractType, { question: string; answer: string }[]> = {
  'artist-manager': [
    {
      question: 'What is an artist-manager agreement?',
      answer: 'An artist-manager agreement outlines the business relationship between an artist and their manager. It specifies the manager\'s duties, compensation (typically a percentage of the artist\'s earnings), and the duration of the arrangement.'
    },
    {
      question: 'What percentage do managers typically take?',
      answer: 'Manager commissions typically range from 15-20% of the artist\'s income, though this can vary based on the manager\'s experience and the services provided.'
    },
    {
      question: 'How long do management contracts last?',
      answer: 'Management contracts typically last 1-3 years initially, often with options to renew based on performance and mutual agreement.'
    }
  ],
  'record-label': [
    {
      question: 'What rights do I give up in a record deal?',
      answer: 'Typically, you grant the label ownership or exclusive licenses to your master recordings for a specified period. The contract should clearly outline which rights you retain and which you transfer.'
    },
    {
      question: 'How do royalties work in a record deal?',
      answer: 'Artists typically receive royalties as a percentage of revenue from sales, streams, and licensing. Royalty rates vary widely (commonly 10-25%) and may only begin after the label recoups its initial investment.'
    },
    {
      question: 'What is a 360 deal?',
      answer: 'A 360 deal allows the label to take a percentage of revenue from all artist activities beyond music sales, including merchandise, touring, and endorsements, in exchange for greater investment in the artist\'s career.'
    }
  ],
  'producer': [
    {
      question: 'How do producer royalties work?',
      answer: 'Producers typically receive "points" (percentage points of royalties) on recordings they produce, often 2-5% of the retail price or artist royalty rate, plus an upfront fee for their services.'
    },
    {
      question: 'Do producers own any rights to the songs they produce?',
      answer: 'Unless specifically negotiated, producers don\'t automatically get songwriting credits or publishing rights. However, they typically have rights to royalties from the master recording.'
    },
    {
      question: 'What\'s a typical producer fee?',
      answer: 'Producer fees vary greatly depending on experience and can range from a few hundred dollars to tens of thousands per track for established producers.'
    }
  ],
  'songwriter': [
    {
      question: 'How are songwriting royalties calculated?',
      answer: 'Songwriters earn royalties primarily from mechanical royalties (for sales/streams), performance royalties (when songs are performed publicly), and synchronization royalties (when songs are used in visual media).'
    },
    {
      question: 'What is a publishing deal?',
      answer: 'A publishing deal involves a publisher representing and administering a songwriter\'s compositions in exchange for a percentage of royalties. Publishers handle licensing, royalty collection, and promoting the songs for placement opportunities.'
    },
    {
      question: 'How are co-writing credits determined?',
      answer: 'Co-writing splits should be clearly defined in writing before a song is commercially released. These splits can be equal or proportional to each writer\'s contribution to the lyrics and melody.'
    }
  ],
  'performance': [
    {
      question: 'What should be included in a performance contract?',
      answer: 'Performance contracts should specify date, time, venue, payment amount, payment schedule, technical requirements (rider), cancellation terms, and who covers expenses like travel and accommodation.'
    },
    {
      question: 'What is a performance rider?',
      answer: 'A rider outlines technical specifications (sound, lighting requirements) and hospitality needs (food, drinks, accommodation) required by the artist for the performance.'
    },
    {
      question: 'How do deposits work for performances?',
      answer: 'Deposits typically range from 25-50% of the agreed fee, paid in advance to secure the booking, with the remainder paid on or before the performance date.'
    }
  ],
  'licensing': [
    {
      question: 'What\'s the difference between exclusive and non-exclusive licenses?',
      answer: 'An exclusive license grants the licensee sole rights to use the music in the specified way, while a non-exclusive license allows the same music to be licensed to multiple parties simultaneously.'
    },
    {
      question: 'How long do music licenses typically last?',
      answer: 'License durations vary widely based on use, from perpetual licenses for small projects to limited terms (1-5 years) for larger commercial uses, often with options to renew.'
    },
    {
      question: 'What rights do I need for different types of use?',
      answer: 'Different uses require different rights: synchronization rights for visual media, mechanical rights for reproductions, performance rights for public performances, and master use rights if using a specific recording.'
    }
  ],
  'distribution': [
    {
      question: 'What does a music distributor do?',
      answer: 'A distributor delivers your music to digital streaming platforms and stores, collects revenue, and provides sales/streaming analytics. Some also offer marketing services and playlist pitching.'
    },
    {
      question: 'How do distributor fees work?',
      answer: 'Distribution models vary from percentage-based (distributor takes 10-30% of revenue) to subscription-based (flat annual fee with the artist keeping 100% of royalties).'
    },
    {
      question: 'What\'s the difference between label distribution and DIY distribution?',
      answer: 'Label distribution includes marketing, promotion, and often an advance, taking a higher percentage of revenue. DIY distribution provides the technical service of getting music onto platforms with minimal additional services.'
    }
  ],
  'collaboration': [
    {
      question: 'How should collaborators split rights and royalties?',
      answer: 'Collaboration agreements should clearly define ownership splits for master recording royalties and publishing rights, typically based on each party\'s contribution to the project.'
    },
    {
      question: 'What should a collaboration agreement include?',
      answer: 'Key elements include ownership percentages, how decisions about the work will be made, how expenses will be shared, credit attribution, and what happens if one party wants to exit the collaboration.'
    },
    {
      question: 'How are collaboration disputes resolved?',
      answer: 'A good collaboration agreement includes a dispute resolution mechanism, typically starting with informal negotiation, then possibly mediation, and finally arbitration or litigation as a last resort.'
    }
  ],
  'session-musician': [
    {
      question: 'Do session musicians get royalties?',
      answer: 'Typically, session musicians receive a one-time fee (buyout) rather than royalties. However, they may negotiate for royalties or retain certain rights, particularly for prominent contributions.'
    },
    {
      question: 'What rights do session musicians have?',
      answer: 'By default, session musicians have performance rights to their recorded parts, but these are typically signed away in work-for-hire agreements. They retain rights to be credited and to receive union-mandated payments for certain uses.'
    },
    {
      question: 'What\'s a typical session fee?',
      answer: 'Session fees vary widely based on location, project budget, and musician expertise, ranging from $100-500+ per song for independent projects to $400+ per hour for union sessions.'
    }
  ],
  'sync-licensing': [
    {
      question: 'What is synchronization licensing?',
      answer: 'Sync licensing grants permission to use music in combination with visual media such as films, TV shows, commercials, video games, and online content.'
    },
    {
      question: 'How much can I earn from sync placements?',
      answer: 'Sync fees vary dramatically based on factors like the prominence of the placement, the platform/medium, the length of use, and your negotiating power. Fees can range from hundreds to hundreds of thousands of dollars.'
    },
    {
      question: 'What\'s the difference between exclusive and non-exclusive sync licensing?',
      answer: 'Exclusive sync licensing means the music can only be used by one licensee in a specified medium, while non-exclusive allows multiple parties to use the same music, potentially in competing products.'
    }
  ],
  'nft-music': [
    {
      question: 'What is a music NFT?',
      answer: 'A music NFT (non-fungible token) is a unique digital asset on a blockchain that represents ownership of a piece of music or music-related content, which can include special perks like royalty shares or exclusive experiences.'
    },
    {
      question: 'How do royalties work with music NFTs?',
      answer: 'NFTs can be programmed with smart contracts to automatically distribute royalties to all rightsholders (including the original creator) for both initial sales and secondary market transactions.'
    },
    {
      question: 'What legal considerations exist for music NFTs?',
      answer: 'When creating music NFTs, artists must ensure they own or have properly licensed all rights to the music, clearly define what rights are being transferred to the buyer, and consider tax implications of NFT sales.'
    }
  ]
};

const ContractTypeFAQ = ({ contractType, open, onClose }: ContractTypeFAQProps) => {
  const faqs = FAQ_DATA[contractType as ContractType] || [];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">
              Frequently Asked Questions
            </DialogTitle>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-1.5">
              <h3 className="font-semibold text-base">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{faq.answer}</p>
            </div>
          ))}
          
          {faqs.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No FAQs available for this contract type.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractTypeFAQ;

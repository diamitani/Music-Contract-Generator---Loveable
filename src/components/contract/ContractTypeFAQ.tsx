
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONTRACT_TYPES } from '@/utils/contracts';
import { ContractType } from '@/utils/contracts/types';

interface ContractTypeFAQProps {
  contractType: ContractType;
}

// FAQ data for each contract type
const FAQ_DATA: Record<ContractType, { question: string; answer: string }[]> = {
  'artist-manager': [
    {
      question: "What is an Artist-Manager Agreement?",
      answer: "A contract that outlines the business relationship between an artist and their manager, including responsibilities, commission rates, and term length."
    },
    {
      question: "What percentage do managers typically take?",
      answer: "Industry standard is typically 15-20% of the artist's income, but this can vary based on the artist's career stage and negotiation."
    },
    {
      question: "How long does a management contract typically last?",
      answer: "Usually between 1-3 years, with options for renewal based on performance."
    }
  ],
  'record-label': [
    {
      question: "What is a Record Label Contract?",
      answer: "An agreement between an artist and a record label where the label provides financial support for recording, marketing, and distribution in exchange for rights to the music."
    },
    {
      question: "How are royalties typically split in a record deal?",
      answer: "Traditional deals offer artists 10-15% of record sales, while more modern deals may offer 50% or higher, especially for streaming revenue."
    },
    {
      question: "What's the difference between a major and indie label deal?",
      answer: "Major labels offer larger advances and marketing budgets but take more control and rights. Indie labels typically offer better royalty rates and more creative freedom."
    }
  ],
  'producer': [
    {
      question: "What is a Producer Agreement?",
      answer: "A contract between an artist and a music producer that outlines payment, credit, and ownership rights related to the production of music."
    },
    {
      question: "How are producers typically compensated?",
      answer: "Usually through a combination of an upfront fee (flat rate per track) and royalties (typically 2-5% of record sales or streams)."
    },
    {
      question: "Do producers own part of the copyright?",
      answer: "It depends on the agreement. Some producers receive a percentage of the master recording copyright, while others only receive royalties."
    }
  ],
  'songwriter': [
    {
      question: "What is a Songwriter Agreement?",
      answer: "A contract that addresses the rights and compensation for songwriters who create compositions for artists or other commercial uses."
    },
    {
      question: "How do songwriters get paid?",
      answer: "Through mechanical royalties (from sales/streams), performance royalties (radio, live, TV), and synchronization fees (when music is used in film/TV/ads)."
    },
    {
      question: "What's a publishing deal?",
      answer: "An agreement where a songwriter assigns copyright interest to a publisher who promotes the songs in exchange for a percentage of the royalties (typically 50%)."
    }
  ],
  'performance': [
    {
      question: "What is a Performance Contract?",
      answer: "An agreement that outlines the terms for a live performance, including payment, technical requirements, and cancellation policies."
    },
    {
      question: "What should be included in a rider?",
      answer: "Technical requirements (sound, lighting, stage specs), hospitality needs (food, drinks, accommodations), and any special requests for the performance."
    },
    {
      question: "How are deposits typically handled?",
      answer: "Usually 50% of the fee is paid as a non-refundable deposit upon signing, with the remainder due on or before the performance date."
    }
  ],
  'licensing': [
    {
      question: "What is a Music Licensing Agreement?",
      answer: "A contract that grants permission to use a copyrighted music composition or recording for specific purposes like film, TV, commercials, or games."
    },
    {
      question: "What's the difference between exclusive and non-exclusive licenses?",
      answer: "Exclusive licenses grant rights to only one party, while non-exclusive licenses allow the same music to be licensed to multiple parties simultaneously."
    },
    {
      question: "How are licensing fees determined?",
      answer: "Based on factors like usage type (background/featured), media type (film/TV/ad), territory (local/national/worldwide), and term length (limited/perpetual)."
    }
  ],
  'distribution': [
    {
      question: "What is a Distribution Agreement?",
      answer: "A contract between an artist or label and a distributor who makes music available on digital platforms and/or physical retailers."
    },
    {
      question: "What's the difference between traditional and digital distribution?",
      answer: "Traditional distribution handles physical products (CDs, vinyl) to retail stores, while digital distribution delivers music to streaming platforms and download stores."
    },
    {
      question: "How do distribution fees work?",
      answer: "Digital distributors typically charge either an annual fee per release or take a percentage of revenue (usually 10-15%). Some offer free distribution but take a higher percentage."
    }
  ]
};

const ContractTypeFAQ = ({ contractType }: ContractTypeFAQProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const faqs = FAQ_DATA[contractType] || [];
  
  if (faqs.length === 0) return null;
  
  return (
    <div className="mt-6 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <span>Frequently Asked Questions</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      
      {isOpen && (
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="px-4 py-3 text-sm font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default ContractTypeFAQ;

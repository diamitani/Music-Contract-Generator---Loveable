
import { ContractType } from '@/utils/contracts/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ContractTypeFAQProps {
  contractType: ContractType;
  open?: boolean;
  onClose?: () => void;
}

const FAQ_DATA: Record<string, Array<{ question: string; answer: string }>> = {
  'artist-manager': [
    {
      question: "What is an Artist Management Agreement?",
      answer: "An Artist Management Agreement outlines the responsibilities between an artist and their manager. It covers compensation, term length, exclusivity, and the specific services a manager will provide."
    },
    {
      question: "What percentage do managers typically take?",
      answer: "Music managers typically earn 15-20% of an artist's income, though this can vary based on career stage and services provided."
    },
    {
      question: "How long should my management contract last?",
      answer: "Initial contracts often range from 1-3 years, with options for renewal. New artists might start with shorter terms to evaluate the relationship."
    },
  ],
  'record-label': [
    {
      question: "What does a record label contract cover?",
      answer: "A record deal covers recording rights, distribution, payment structure (advances and royalties), and the number of albums or tracks you're committed to creating."
    },
    {
      question: "What royalty percentage is standard?",
      answer: "Traditional record deals offer artists 15-25% of revenue after recouping costs. Independent labels may offer 40-50%, while modern distribution deals can reach 70-85%."
    },
  ],
  // Additional contract types would be defined here
};

const ContractTypeFAQ = ({ contractType }: ContractTypeFAQProps) => {
  const faqs = FAQ_DATA[contractType] || [];
  
  if (faqs.length === 0) {
    return (
      <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400">No FAQs available for this contract type.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-fade-in">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-sm font-medium py-2">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-gray-600 dark:text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ContractTypeFAQ;

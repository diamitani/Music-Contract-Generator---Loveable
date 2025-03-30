
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ContractSubmitButtonProps = {
  onClick: () => void;
  isSubmitting: boolean;
};

const ContractSubmitButton = ({ onClick, isSubmitting }: ContractSubmitButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onClick}
        disabled={isSubmitting}
        variant="default"
        className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black hover:bg-opacity-80 dark:hover:bg-opacity-80 rounded-full"
      >
        {isSubmitting ? (
          <>Generating<span className="loading">...</span></>
        ) : (
          <>Generate Contract <ArrowRight className="w-4 h-4" /></>
        )}
      </Button>
    </div>
  );
};

export default ContractSubmitButton;

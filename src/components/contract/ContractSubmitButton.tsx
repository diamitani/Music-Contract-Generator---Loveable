
import React from 'react';
import { ArrowRight } from 'lucide-react';

type ContractSubmitButtonProps = {
  onClick: () => void;
  isSubmitting: boolean;
};

const ContractSubmitButton = ({ onClick, isSubmitting }: ContractSubmitButtonProps) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        disabled={isSubmitting}
        className="button-transition flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>Generating<span className="loading">...</span></>
        ) : (
          <>Generate Contract <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </div>
  );
};

export default ContractSubmitButton;

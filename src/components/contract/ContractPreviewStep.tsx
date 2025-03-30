
import { useState } from 'react';
import { useContract } from '@/context/ContractContext';
import { ArrowLeft, Download, Pen, FileType } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { exportToPDF } from '@/utils/pdfExport';

const ContractPreviewStep = () => {
  const { setCurrentStep, generatedContract } = useContract();
  const [contractText, setContractText] = useState(generatedContract || '');

  const handleDownload = (format: 'txt' | 'docx' | 'pdf') => {
    // For txt format, use blob
    if (format === 'txt') {
      const blob = new Blob([contractText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contract.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Contract downloaded as text file successfully!');
    } 
    // For Word document format
    else if (format === 'docx') {
      // Creating a Word-compatible document using HTML
      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset="utf-8">
            <title>Contract</title>
          </head>
          <body>
            <div style="white-space: pre-wrap; font-family: 'Times New Roman', Times, serif;">
              ${contractText.replace(/\n/g, '<br>')}
            </div>
          </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contract.doc`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Contract downloaded as Word document successfully!');
    }
    // For PDF format
    else if (format === 'pdf') {
      try {
        exportToPDF(contractText, 'contract.pdf');
        toast.success('Contract downloaded as PDF successfully!');
      } catch (error) {
        toast.error('Failed to download PDF. Please try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentStep(1)}
        className="button-transition flex items-center gap-1 text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to form
      </button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-slide-in-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Your Contract</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Review your generated contract and make any necessary edits
          </p>
        </div>
        
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            className="button-transition flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900"
            onClick={() => {
              toast.info('Editing mode enabled. Make your changes in the text below.');
            }}
          >
            <Pen className="w-4 h-4" /> Edit
          </button>
          
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="button-transition flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-80 dark:hover:bg-opacity-80"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col space-y-1">
                <button
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => handleDownload('txt')}
                >
                  <FileType className="w-4 h-4" />
                  <span>Text File (.txt)</span>
                </button>
                <button
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => handleDownload('docx')}
                >
                  <FileType className="w-4 h-4" />
                  <span>Word Document (.doc)</span>
                </button>
                <button
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-sm"
                  onClick={() => handleDownload('pdf')}
                >
                  <FileType className="w-4 h-4" />
                  <span>PDF Document (.pdf)</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="glass-panel p-6 overflow-auto animate-slide-in-up animation-delay-100">
        <div className="max-h-[70vh] overflow-y-auto pr-4 font-mono text-sm whitespace-pre-wrap">
          {contractText}
        </div>
      </div>
    </div>
  );
};

export default ContractPreviewStep;

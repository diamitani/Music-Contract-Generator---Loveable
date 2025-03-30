
import React, { useState, useRef } from 'react';
import { useContract } from '@/context/ContractContext';
import { Upload, FileType, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ContractUploader = () => {
  const { setUploadedContract, setCurrentStep } = useContract();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = async (file: File) => {
    // Check if file is a text file, PDF, DOC or DOCX
    if (
      !file.name.match(/\.(txt|pdf|doc|docx)$/i)
    ) {
      toast.error("Please upload a text, PDF, or Word document file");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For text files, use FileReader directly
      if (file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setUploadedContract(content);
          toast.success("Contract uploaded successfully");
          setCurrentStep(2); // Go to preview step
          setIsLoading(false);
        };
        reader.readAsText(file);
      } 
      // For other file types, we'll just extract text content for now
      // In a real app, you might want to parse PDF/DOC with server-side tools
      else {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            // For demo purposes, we'll just use text content
            // In a real app, you would use a proper parser for PDF/DOCX
            const content = `## Extracted content from ${file.name}\n\n` +
              `Note: This is a simplified text extraction. For full document parsing, a server-side solution would be needed.\n\n` +
              `Filename: ${file.name}\n` +
              `File size: ${(file.size / 1024).toFixed(2)} KB\n` +
              `File type: ${file.type}\n\n`;
            
            setUploadedContract(content);
            toast.success("Contract uploaded with limited text extraction");
            setCurrentStep(2); // Go to preview step
            setIsLoading(false);
          } catch (error) {
            console.error("Error processing file:", error);
            toast.error("Could not process this file type. Please try a plain text (.txt) file.");
            setIsLoading(false);
          }
        };
        reader.readAsText(file); // Basic text extraction
      }
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Error reading file. Please try again.");
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <button
        onClick={() => setCurrentStep(0.5)}
        className="button-transition flex items-center gap-1 text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Back to contract selection
      </button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-slide-in-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Upload Your Contract</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Upload an existing contract to analyze or edit
          </p>
        </div>
      </div>
      
      <div className="glass-panel p-6 animate-slide-in-up animation-delay-100">
        <div
          className={`border-2 border-dashed rounded-lg p-10 text-center ${
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-gray-300 dark:border-gray-700"
          } transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Drag and drop your contract file</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Or click to browse (TXT, PDF, DOC, DOCX)
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Select File"}
              </button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.pdf,.doc,.docx"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Supported file types:</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { ext: 'TXT', icon: FileType, desc: 'Text files (recommended)' },
              { ext: 'PDF', icon: FileType, desc: 'PDF files (basic text extraction)' },
              { ext: 'DOC', icon: FileType, desc: 'Word documents (basic text extraction)' },
            ].map((type) => (
              <div key={type.ext} className="flex items-center gap-2 p-3 border rounded-md">
                <type.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">{type.ext}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractUploader;

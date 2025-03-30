
import { jsPDF } from 'jspdf';

export const exportToPDF = (contractText: string, filename = 'contract.pdf'): void => {
  try {
    const doc = new jsPDF();
    
    // Configure the document
    doc.setFont('helvetica');
    doc.setFontSize(12);
    
    // Split text into lines to fit within the page width
    const pageWidth = doc.internal.pageSize.width - 40; // 20mm margins on each side
    const splitText = doc.splitTextToSize(contractText, pageWidth);
    
    // Add content to document
    doc.text(splitText, 20, 20);
    
    // Save the PDF
    doc.save(filename);
    
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw new Error("Failed to export contract to PDF");
  }
};

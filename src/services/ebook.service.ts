 import type { EbookContent } from '@/data/ebooks-content';
 
 export function downloadEbookPdf(ebook: EbookContent, title: string): void {
   const printWindow = window.open('', '_blank');
   
   if (!printWindow) {
     alert('Por favor, permita pop-ups para baixar o PDF.');
     return;
   }
   
   const content = ebook.pages.map(page => `
     <div style="page-break-after: always; padding: 60px; min-height: 100vh; display: flex; flex-direction: column; justify-content: center;">
       ${page.illustration ? `<div style="text-align: center; font-size: 120px; margin-bottom: 40px;">${page.illustration}</div>` : ''}
       <h1 style="font-size: 32px; text-align: center; margin-bottom: 40px; color: #1a1a1a;">${page.title}</h1>
       ${page.content.map(p => `<p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #333;">${p.replace(/\n/g, '<br>')}</p>`).join('')}
       <div style="margin-top: auto; text-align: center; font-size: 12px; color: #999;">Página ${page.pageNumber}</div>
     </div>
   `).join('');
   
   printWindow.document.write(`
     <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <title>${title}</title>
         <style>
           @media print {
             @page { margin: 0; size: A4; }
             body { margin: 0; padding: 0; }
           }
           body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
         </style>
       </head>
       <body>${content}</body>
     </html>
   `);
   
   printWindow.document.close();
   printWindow.onload = () => {
     setTimeout(() => {
       printWindow.print();
       setTimeout(() => printWindow.close(), 1000);
     }, 500);
   };
 }
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { ChevronLeft, ChevronRight, X } from 'lucide-react';
 import { useState } from 'react';
 import type { EbookContent } from '@/data/ebooks-content';
 
 interface EbookViewerProps {
   ebook: EbookContent | null;
   isOpen: boolean;
   onClose: () => void;
 }
 
 export function EbookViewer({ ebook, isOpen, onClose }: EbookViewerProps) {
   const [currentPage, setCurrentPage] = useState(0);
 
   if (!ebook) return null;
 
   const page = ebook.pages[currentPage];
   const totalPages = ebook.pages.length;
 
   return (
     <Dialog open={isOpen} onOpenChange={onClose}>
       <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
         <DialogHeader>
           <DialogTitle className="flex items-center justify-between">
             <span>Página {currentPage + 1} de {totalPages}</span>
             <Button variant="ghost" size="icon" onClick={onClose}>
               <X className="h-4 w-4" />
             </Button>
           </DialogTitle>
         </DialogHeader>
         
         <div className="flex-1 overflow-auto p-6 bg-muted/30 rounded-lg">
           <div className="max-w-2xl mx-auto space-y-6">
             {page.illustration && (
               <div className="text-center text-8xl mb-8">{page.illustration}</div>
             )}
             <h2 className="text-3xl font-bold text-center mb-6">{page.title}</h2>
             <div className="space-y-4 text-lg leading-relaxed">
               {page.content.map((paragraph, idx) => (
                 <p key={idx} className="whitespace-pre-line">{paragraph}</p>
               ))}
             </div>
           </div>
         </div>
         
         <div className="flex items-center justify-between pt-4 border-t">
           <Button
             variant="outline"
             onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
             disabled={currentPage === 0}
           >
             <ChevronLeft className="mr-2 h-4 w-4" />
             Anterior
           </Button>
           <span className="text-sm text-muted-foreground">
             {currentPage + 1} / {totalPages}
           </span>
           <Button
             variant="outline"
             onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
             disabled={currentPage === totalPages - 1}
           >
             Próxima
             <ChevronRight className="ml-2 h-4 w-4" />
           </Button>
         </div>
       </DialogContent>
     </Dialog>
   );
 }
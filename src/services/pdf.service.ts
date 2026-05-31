import type { UserProfile, WeeklyMenu, Recommendation, PlanType } from '@/types';
import { plans } from '@/data/mocks';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { DietPdfTemplate } from '@/components/pdf/DietPdfTemplate';
import { EbookCollection } from '@/data/ebooks';
import { EbookPdfTemplate } from '@/components/pdf/EbookPdfTemplate';

/**
 * Verifica se o PDF está disponível para o plano do usuário
 */
export function isPdfAvailable(planType: PlanType): boolean {
  const plan = plans.find((p) => p.type === planType);
  return plan?.pdfAvailable ?? false;
}

/**
 * Verifica se PDFs extras estão disponíveis
 */
export function hasExtraPdfs(planType: PlanType): boolean {
  const plan = plans.find((p) => p.type === planType);
  return plan?.extraPdfs ?? false;
}

/**
 * Gera o nome do arquivo PDF
 */
export function generatePdfFilename(userName: string): string {
  const date = new Date().toISOString().split('T')[0];
  const sanitizedName = userName.replace(/\s+/g, '_');
  return `DietCase_Dieta_${sanitizedName}_${date}.pdf`;
}

export function generateEbookFilename(ebookTitle: string): string {
  const sanitizedTitle = ebookTitle.replace(/\s+/g, '_').replace(/[:]/g, '');
  return `DietCase_Ebook_${sanitizedTitle}.pdf`;
}

/**
* Gera e baixa o PDF usando window.print
 */
export function downloadPdf(
  profile: UserProfile,
  menu: WeeklyMenu,
  recommendations: Recommendation[],
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const pdfComponent = createElement(DietPdfTemplate, {
        profile,
        menu,
        recommendations,
      });

      const htmlString = renderToString(pdfComponent);
      printHtml(htmlString, generatePdfFilename(profile.name), resolve, reject);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      reject(error);
    }
  });
}

/**
 * Gera e baixa o PDF do Ebook
 */
export function downloadEbookPdf(collection: EbookCollection): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const pdfComponent = createElement(EbookPdfTemplate, {
        collection,
      });

      const htmlString = renderToString(pdfComponent);
      printHtml(htmlString, generateEbookFilename(collection.title), resolve, reject);
    } catch (error) {
      console.error('Erro ao gerar PDF do Ebook:', error);
      reject(error);
    }
  });
}

/**
 * Função helper para imprimir HTML em nova janela
 */
function printHtml(
  htmlString: string,
  title: string,
  resolve: () => void,
  reject: (error: Error) => void
) {
  const printWindow = window.open('', '_blank');

  if (!printWindow) {
    reject(new Error('Pop-up bloqueado. Permita pop-ups para baixar o PDF.'));
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            @page {
              margin: 0;
              size: A4;
            }
            body {
              margin: 0;
              padding: 0;
            }
            .break-after-page {
              page-break-after: always;
            }
            .break-inside-avoid {
              page-break-inside: avoid;
            }
          }
          body {
            font-family: 'Inter', Arial, sans-serif;
            margin: 0;
            padding: 0;
             -webkit-print-color-adjust: exact;
             print-color-adjust: exact;
          }
        </style>
      </head>
      <body>
        ${htmlString}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Aguarda carregamento (incluindo imagens/scripts)
  printWindow.onload = () => {
    // Timeout extra para garantir renderização de estilos/Tailwind CDN
    setTimeout(() => {
      printWindow.print();

      // Fecha a janela após imprimir (usuário pode ter cancelado)
      // Aumentado timeout para dar tempo ao dialog
      setTimeout(() => {
        // printWindow.close(); // Comentado para permitir debug se necessário, ou fechar manualmente
        resolve();
      }, 500);
    }, 1000);
  };
}

/**
 * Valida se o usuário pode baixar o PDF
 */
export function validatePdfDownload(planType: PlanType): {
  canDownload: boolean;
  message?: string;
} {
  if (!isPdfAvailable(planType)) {
    return {
      canDownload: false,
      message: 'O download de PDF não está disponível no seu plano atual.',
    };
  }

  return { canDownload: true };
}
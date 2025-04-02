import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async generatePdf(
    htmlElement: HTMLElement,
    fileName: string = 'document.pdf'
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Store original display values and hide no-print elements
        const elementsToHide = document.querySelectorAll('.no-print');
        const originalDisplayValues: { element: Element; display: string }[] =
          [];

        elementsToHide.forEach((el) => {
          originalDisplayValues.push({
            element: el,
            display: (el as HTMLElement).style.display,
          });
          (el as HTMLElement).style.display = 'none';
        });

        const options = {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: document.documentElement.scrollWidth,
          windowHeight: document.documentElement.scrollHeight,
        };

        html2canvas(htmlElement, options)
          .then((canvas) => {
            // Restore original display values
            originalDisplayValues.forEach((item) => {
              (item.element as HTMLElement).style.display = item.display;
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
            }

            pdf.save(fileName);
            resolve();
          })
          .catch((error) => {
            // Ensure elements are restored even if there's an error
            originalDisplayValues.forEach((item) => {
              (item.element as HTMLElement).style.display = item.display;
            });
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

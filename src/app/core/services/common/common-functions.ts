import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// csv-export.util.ts
export function exportToCsv(filename: string, rows: any[]) {
  if (!rows || !rows.length) {
    return;
  }

  const separator = ','; // CSV separator

  // Flatten the data and map headers to French
  const flattenedRows = rows.map((row) => {
    return {
      ID: row.id,
      Titre: row.title,
      "Nom de l'entreprise": row.company?.name || '',
      Description: row.description,
      Poste: row.job?.name || '',
      Ville: row.city?.name || '',
      'Date de publication': row.publicationDate,
      'Type de contrat': row.contractType?.description || '',
      'Date de début': row.startDate,
      'Date de fin': row.endDate,
      'Durée prévue': row.expectedDuration,
      'Unité de temps': row.timeUnit,
      Statut: row.status?.name || '',
    };
  });

  // Extract headers from the first row
  const headers = Object.keys(flattenedRows[0]);

  // Create CSV content
  const csvContent =
    headers.join(separator) + // Add headers
    '\n' + // Add new line
    flattenedRows
      .map((row: any) => {
        return headers
          .map((header: any) => {
            // Escape double quotes and wrap fields with double quotes if they contain commas or newlines
            let field =
              row[header] === null || row[header] === undefined
                ? ''
                : row[header];
            field = String(field).replace(/"/g, '""');
            if (field.includes(separator) || field.includes('\n')) {
              field = `"${field}"`;
            }
            return field;
          })
          .join(separator);
      })
      .join('\n'); // Add new line between rows

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link element to trigger the download
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    return selectedDate < minDate
      ? { minDate: { value: control.value } }
      : null;
  };
}

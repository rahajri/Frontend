import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function exportToCsv(filename: string, rows: any[]) {
  if (!rows || !rows.length) {
    return;
  }

  const separator = ','; // CSV separator

  // Function to convert HTML to plain text while preserving line breaks and basic styling
  const htmlToPlainText = (html: string) => {
    // Replace <br>, <p>, and <div> tags with line breaks
    html = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/div>/gi, '\n');
    // Remove other HTML tags but keep their content
    html = html.replace(/<[^>]+>/g, '');
    // Trim extra spaces and line breaks
    html = html.replace(/\s+/g, ' ').trim();
    return html;
  };

  // Flatten the data and map headers to French
  const flattenedRows = rows.map((row) => {
    return {
      ID: row.id,
      'Date de création': row.createdAt,
      Titre: row.title,
      "Nom de l'entreprise": row.company?.name || '',
      Description: htmlToPlainText(row.description), // Convert HTML to plain text
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
    '\uFEFF' + // Add UTF-8 BOM
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

export function companyExistsValidator(
  getFilteredCompanies: () => any[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const filteredCompanies = getFilteredCompanies();
    const enteredValue = control.value.trim().toLowerCase();
    const companyExists = filteredCompanies.some(
      (company) => company.name.trim().toLowerCase() === enteredValue
    );

    return companyExists ? null : { companyNotExist: true };
  };
}

export function toggleAllCheckboxes(event: Event): void {
  // Get the target checkbox that was clicked
  const targetCheckbox = event.target as HTMLInputElement;
  const isChecked = targetCheckbox.checked;

  // Select all checkboxes in the table
  const allCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  ) as NodeListOf<HTMLInputElement>;

  // Set the checked state of all checkboxes to match the clicked checkbox
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });
}

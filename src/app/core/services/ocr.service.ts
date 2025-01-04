import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  private apiUrl = 'https://api.vectorshift.ai/api/pipelines/run';

  constructor(private http: HttpClient) {}

  runPipeline( cvs: File[]): Observable<any> {
    const headers = new HttpHeaders({
      'Api-Key': 'sk_rFnImoY7CdaXw9dNUMw96P6Mnb4ESyKqv63IkfGwHekLmUzK', // Replace with your actual API key
    });

    const data = new FormData();
    data.append('pipeline_name', 'OCR');
    data.append('username', 'vision-agile');
    data.append('inputs', JSON.stringify({}));

    // Append the CV files to the FormData
    for (let i = 0; i < cvs.length; i++) {
      data.append('CVs', cvs[i], cvs[i].name);
    }

    const res = this.http.post(this.apiUrl, data, { headers });
    return res;
  }
}

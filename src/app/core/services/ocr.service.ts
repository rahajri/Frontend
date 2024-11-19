import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  //private apiUrl = 'https://api.vectorshift.ai/api/pipelines/run';
  private apiUrl = 'https://api.vectorshift.ai/api/pipelines/run';

 
  constructor(private http: HttpClient) {}

  runPipeline(username: string, cvs: File[]): Observable<any> {
    const headers = new HttpHeaders({
      'Api-Key': 'sk_ZH4Bctps0aMZvrqRUp899hm55fOIXCnl5iEV2mdvh2GhMl8j', // Replace with your actual API key
    });

    const data = new FormData();
    data.append('pipeline_name', 'OCR');
    data.append('username', 'averroes');
    data.append('inputs' ,JSON.stringify({}));

    // Append the CV files to the FormData
    for (let i = 0; i < cvs.length; i++) {
      data.append('CVs', cvs[i], cvs[i].name);
    }
   
      const res = this.http.post(this.apiUrl, data, { headers });
    //  console.log('jsonObject:', res);
      return res;
  }
}

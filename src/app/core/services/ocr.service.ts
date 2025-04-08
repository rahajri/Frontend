import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OcrService {
  private apiUrl = 'http://127.0.0.1:8000/ocr/upload';

  constructor(private http: HttpClient) {}

  async runPipeline(cvs: File[]): Promise<any> {
    const data = new FormData();

    for (let i = 0; i < cvs.length; i++) {
      data.append('file', cvs[i], cvs[i].name);
    }

    try {
      const res = await this.http.post<any>(this.apiUrl, data).toPromise();
      return res;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  }
}

import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  apiUrl: string =  "http://localhost:8080/file";

  constructor(private http: HttpClient) {
  }

  generateFile(rowNumCount: number): Observable<{filename: string, totalRecords: string}> {
    return this.http.get<{ filename: string, totalRecords: string }>(`${this.apiUrl}/generate-excel?recordCount=${rowNumCount}`, {})
  }

  convertFile(fileName: string = ""): Observable<{from_excel: string, to_csv: string}> {
    return this.http.get<{from_excel: string, to_csv: string}>(`${this.apiUrl}/convert?fileName=${fileName}`, {})
  }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('File upload failed:', error);
    return throwError(() => new Error(error.error || 'File upload failed.'));
  }
}

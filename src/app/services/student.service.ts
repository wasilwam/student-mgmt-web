import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  DOB: string;
  studentClass: string;
  score: number;
  status: number;
  photoPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://your-api-url.com/students';

  constructor(private http: HttpClient) {}

  // Get students with pagination
  getStudents(page: number, pageSize: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}?page=${page}&size=${pageSize}`);
  }

  updateStudent(id: number, formData: FormData): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  uploadPhoto(id: number, formData: FormData): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/${id}/upload-photo`, formData);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}`);
  }
}

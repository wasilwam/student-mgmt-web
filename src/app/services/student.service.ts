import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  dob: string;
  class: string;
  score: number;
  status: number;
  photoPath: string;
}

export interface StudentsCount {
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {}

  // Get students with pagination
  getStudents(page: number, pageSize: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}?page=${page}&size=${pageSize}`);
  }

  getStudentsCount(): Observable<StudentsCount> {
    return this.http.get<StudentsCount>(`${this.apiUrl}/count`);
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

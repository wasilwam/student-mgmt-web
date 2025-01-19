import { Component } from '@angular/core';
import {Student, StudentService} from '../../services/student.service';
import {Router} from '@angular/router';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-manage',
  imports: [
    PaginationComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  students: Student[] = [];
  totalStudents: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;
  hasError: boolean = false;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(page: number = 1): void {
    this.isLoading = true;
    this.hasError = false; // Reset error state before loading
    this.studentService.getStudents(page, this.pageSize).subscribe(
      (response: Student[]) => {
        this.students = response;
        this.totalStudents = response.length;
        this.isLoading = false;
      },
      (error: Error) => {
        console.error('Error fetching students', error);
        this.isLoading = false;
        this.hasError = true; // Set error state on failure
      }
    );
  }

  viewStudent(id: number): void {
    this.router.navigate([`/manage/view/${id}`]);
  }

  editStudent(id: number): void {
    this.router.navigate([`/manage/edit/${id}`]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.isLoading = true;
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.loadStudents();
        },
        (error: Error) => {
          console.error('Error deleting student', error);
          this.isLoading = false;
        }
      );
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStudents(page);
  }
}

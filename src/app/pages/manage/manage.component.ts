import { Component } from '@angular/core';
import { Student, StudentService, StudentsResponse } from '../../services/student.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgForOf, NgIf } from '@angular/common';
import { AverageScoreComponent } from "../../components/average-score/average-score.component";
import { SelectedStudentsComponent } from "../../components/selected-students/selected-students.component";

@Component({
  selector: 'app-manage',
  imports: [
    PaginationComponent,
    NgIf,
    NgForOf,
    AverageScoreComponent,
    SelectedStudentsComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  studentsResponse: StudentsResponse | undefined;
  students: Student[] = [];
  totalStudents: number = 0;
  pageSize: number = 100;
  currentPage: number = 1;
  isLoading: boolean = false;
  hasError: boolean = false;
  canMakeUser: boolean | undefined = localStorage.getItem('roles')?.includes('ROLE_STUDENT_MAKER') || localStorage.getItem('roles')?.includes('ROLE_ADMIN');
  selectedStudents: Partial<Student>[] = [];
  totalScore: number = 0;
  students_average: string = '0';

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  };

  loadStudents(page: number = 1): void {
    this.isLoading = true;
    this.hasError = false; // Reset error state before loading
    this.studentService.getStudents(page, this.pageSize).subscribe(
      (response) => {
        this.students = response.content;
        this.totalStudents = response.totalElements;
        this.pageSize = response.pageable.pageSize;
        this.currentPage = response.pageable.pageNumber;
        this.isLoading = false;
      },
      (error: Error) => {
        console.error('Error fetching students', error);
        this.isLoading = false;
        this.hasError = true; // Set error state on failure
      }
    );
  };

  viewStudent(id: number): void {
    this.router.navigate([`/manage/view/${id}`]);
  };

  editStudent(id: number): void {
    this.router.navigate([`/manage/edit/${id}`]);
  };

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

  onSelectStudent(event: any, studentId: number, firstName: string, lastName: string, score: number): void {
    if (event.target.checked) {
      this.selectedStudents.push({ studentId, firstName, lastName, score });
      console.log(this.selectedStudents);
    } else {
      this.selectedStudents = this.selectedStudents.filter(s => s.studentId !== studentId);
      console.log(this.selectedStudents);
    }
    this.calculateTotalScore();
    this.calculateAverage();
  }

  calculateTotalScore(): void {
    this.totalScore = 0;
    this.selectedStudents.map(s => this.totalScore += (Number(s.score) > 0 ? Number(s.score) : 0));
  }

  calculateAverage(): void {
    this.students_average = (this.totalScore / this.selectedStudents.length).toFixed(2);
  }
}

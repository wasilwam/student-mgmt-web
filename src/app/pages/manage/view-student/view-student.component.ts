import { Component } from '@angular/core';
import {Student, StudentService} from '../../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {SafePipe} from '../../../shared/pipe/safe.pipe';

@Component({
  selector: 'app-view-student',
  imports: [
    NgIf,
    DatePipe,
    NgClass,
    NgOptimizedImage,
    SafePipe
  ],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  student: Partial<Student> = {};
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.fetchStudentDetails(Number(studentId));
    }
  }

  // Fetch student details by ID
  fetchStudentDetails(id: number): void {
    this.isLoading = true;
    this.studentService.getStudentById(id).subscribe(
        (response: Student) => {
          this.student = response;
          this.student.photoPath = this.student.photoPath === 'empty'
              ? "/assets/225-default-avatar.png"
              : response.photoPath
          console.log(`photo path to render ${this.student.photoPath}`);
          this.isLoading = false;
        },
      (error) => {
        this.errorMessage = 'Failed to fetch student details. Please try again.';
        console.error('Error fetching student details:', error);
        this.isLoading = false;
      }
    );
  }

  // Navigate back to the manage page
  goBack(): void {
    this.router.navigate(['/manage']);
  }

  // Navigate to the edit page
  editStudent(): void {
    this.router.navigate([`/manage/edit/${this.student.studentId}`]);
  }
}

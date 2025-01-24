import { Component } from '@angular/core';
import { Student, StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { SafePipe } from '../../../shared/pipe/safe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  imports: [
    NgIf,
    DatePipe,
    NgClass,
    NgOptimizedImage,
    SafePipe,
    FormsModule
  ],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {
  student: Partial<Student> = {};
  isLoading: boolean = false;
  errorMessage: string = '';
  canMakeStudent: boolean | undefined = localStorage.getItem('roles')?.includes('ROLE_STUDENT_MAKER') || localStorage.getItem('role')?.includes('ROLE_ADMIN');
  canCheckStudent: boolean | undefined = localStorage.getItem('roles')?.includes('ROLE_STUDENT_CHECKER') || localStorage.getItem('role')?.includes('ROLE_ADMIN');
  rejectingStudent: boolean = false;
  rejectionComment: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) { }

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
          : response.photoPath;
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

  // Student Checker Approval
  approveStudent(): void {
    console.log("approving student");
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.studentChecker(studentId, "Approve", "").subscribe(
      (response: Student) => {
        this.student = response;
        this.student.photoPath = this.student.photoPath === 'empty'
          ? "/assets/225-default-avatar.png"
          : response.photoPath;
        console.log(`photo path to render ${this.student.photoPath}`);
        this.isLoading = false;
      },
      (error: Error) => {
        this.errorMessage = 'Failed to fetch student details. Please try again.';
        console.error('Error fetching student details:', error);
        this.isLoading = false;
      }
    );
  }

  showRejectionForm(): void {
    this.rejectingStudent = !this.rejectingStudent;
  }

  updateRejectionComment(comment: string): void {
    this.rejectionComment = comment;
  }

  // Student Checker Approval
  rejectStudent(): void {
    console.log("rejecting student");
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.studentChecker(studentId, "Reject", this.rejectionComment).subscribe(
      (response: Student) => {
        this.student = response;
        this.student.photoPath = this.student.photoPath === 'empty'
          ? "/assets/225-default-avatar.png"
          : response.photoPath;
        console.log(`photo path to render ${this.student.photoPath}`);
        this.isLoading = false;
        this.rejectingStudent = false;
      },
      (error: Error) => {
        this.errorMessage = 'Failed to fetch student details. Please try again.';
        console.error('Error fetching student details:', error);
        this.isLoading = false;
        this.rejectingStudent = false;
      }
    );
  }
}

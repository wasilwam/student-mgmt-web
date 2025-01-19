import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import {SafePipe} from '../../../shared/pipe/safe.pipe';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-edit-student',
  imports: [SafePipe, NgOptimizedImage, NgClass, NgIf, ReactiveFormsModule, NgForOf],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  editForm!: FormGroup;
  isLoading = false;
  showAlert = false;
  alertMessage = '';
  alertType = 'success';
  photoPath: string = '';
  studentId!: number;
  classOptions: string[] = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStudentData();
  }

  // Initialize form controls
  private initForm() {
    this.editForm = this.fb.group({
      studentId: [this.studentId, [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      class: ['', Validators.required],
      score: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['', Validators.required]
    });
  }

  // Load student data based on route parameter
  private loadStudentData() {
    this.isLoading = true;
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.editForm.patchValue({
          studentId: this.studentId,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          class: data.class,
          score: data.score,
          status: data.status
        });
        this.photoPath = data.photoPath;
        this.isLoading = false;
      },
      error: (err) => {
        this.alertMessage = 'Failed to load student data.';
        this.alertType = 'error';
        this.showAlert = true;
        this.isLoading = false;
      }
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.editForm.invalid) return;

    this.isLoading = true;
    const updatedData = { ...this.editForm.value, photoPath: this.photoPath };

    this.studentService.updateStudent(this.studentId, updatedData).subscribe({
      next: () => {
        this.alertMessage = 'Student details updated successfully!';
        this.alertType = 'success';
        this.showAlert = true;
        this.isLoading = false;
      },
      error: () => {
        this.alertMessage = 'Failed to update student details.';
        this.alertType = 'error';
        this.showAlert = true;
        this.isLoading = false;
      }
    });
  }

  // Handle photo upload
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.isLoading = true;
      this.studentService.uploadPhoto(this.studentId, formData).subscribe({
        next: (response) => {
          this.photoPath = response.photoPath; // Assuming the API returns the new photo path
          this.alertMessage = 'Photo updated successfully!';
          this.alertType = 'success';
          this.showAlert = true;
          this.isLoading = false;
        },
        error: () => {
          this.alertMessage = 'Failed to upload photo.';
          this.alertType = 'error';
          this.showAlert = true;
          this.isLoading = false;
        }
      });
    }
  }

  // Close alert
  closeAlert() {
    this.showAlert = false;
  }

  // Navigate back to the manage list
  goBack() {
    this.router.navigate(['/manage']);
  }
}


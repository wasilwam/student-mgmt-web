import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-upload',
  imports: [
    NgIf
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isLoading: boolean = false;
  selectedFile: File | null = null;
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  totalRecordsCreated: number = 0;
  errorMessage: string = '';

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
      this.errorMessage = 'Please select a valid CSV file.';
      this.showErrorAlert = true;
    }
  }

  // Upload file method
  uploadFile() {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.showErrorAlert = false; // Clear any previous error alert

    // Simulate the file upload to the backend
    setTimeout(() => {
      // Simulating success response from backend
      const success = Math.random() > 0.2; // Random success/failure for demonstration
      if (success) {
        this.totalRecordsCreated = 120; // Example total records created
        this.showSuccessAlert = true;
      } else {
        this.errorMessage = 'There was an issue with the file upload. Please try again.';
        this.showErrorAlert = true;
      }
      this.isLoading = false;
    }, 2000); // Simulating a backend call (2 seconds)
  }

  // Close alert banner
  closeAlert() {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }
}

import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {FileService} from '../../services/file.service';

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
  successMessage: string = ''
  showErrorAlert: boolean = false;
  errorMessage: string = '';

  constructor(private fileService: FileService) {
  }

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

    this.fileService.uploadFile(this.selectedFile).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = res;
        this.showSuccessAlert = true;
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.selectedFile = null;
        this.errorMessage = err.message;
        this.showErrorAlert = true;
      }
    });
  }

  // Close alert banner
  closeAlert() {
    this.showSuccessAlert = false;
    this.showErrorAlert = false;
  }
}

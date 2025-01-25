import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-generate',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
  numRecords: number = 0;
  readonly MAX_NUM_RECORDS = 1000000;
  isLoading: boolean = false;
  showAlert: boolean = false;
  successMessage: string = '';
  showError: boolean = false;
  backendErrorMsg: string = '';

  constructor(private fileService: FileService) {
  }

  // Show alert if number of records to be below MAX_NUM_RECORDS
  // Can also use ngModel=numRecords on template
  limitRecords() {
    this.showError = this.numRecords > this.MAX_NUM_RECORDS;
  }

  generateRecords() {
    if (this.numRecords > this.MAX_NUM_RECORDS) {
      return; // Don't generate if value exceeds the limit
    }

    this.isLoading = true;
    this.fileService.generateFile(this.numRecords).subscribe({
      next: result => {
        this.closeError();
        this.isLoading = false;
        this.showAlert = true;
        this.successMessage = `${result.totalRecords} records. File name: ${result.filename}`;
      },
      error: (err: Error) => {
        this.closeAlert();
        this.isLoading = false;
        this.showError = true;
        this.backendErrorMsg = err.message;
      }
    });
  }

  closeAlert() {
    this.showAlert = false;
  }

  closeError() {
    this.showError = false;
    this.backendErrorMsg = "";
  }
}

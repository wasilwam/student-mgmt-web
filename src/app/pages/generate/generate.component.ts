import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

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
  readonly MAX_NUM_RECORDS = 10000000;
  isLoading: boolean = false;
  showAlert: boolean = false;
  successMessage: string = '';
  showError: boolean = false;

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
    // Simulate backend processing with a delay
    setTimeout(() => {
      this.successMessage = `Generated ${this.numRecords} records`;
      this.showAlert = true;
      this.isLoading = false;
    }, 2000); // Simulate 2 seconds delay
  }

  closeAlert() {
    this.showAlert = false;
  }

  closeError() {
    this.showError = false;
  }
}

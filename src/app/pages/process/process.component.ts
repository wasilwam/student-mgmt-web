import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-process',
  imports: [
    NgIf
  ],
  templateUrl: './process.component.html',
  styleUrl: './process.component.css'
})
export class ProcessComponent {
  isLoading: boolean = false;
  showAlert: boolean = false;
  inputFileName: string = '';
  outputFileName: string = '';

  // Process File method
  processFile() {
    this.isLoading = true;

    // Simulate a backend call to process the file
    setTimeout(() => {
      // On successful processing, update file names
      this.inputFileName = 'data.xlsx';
      this.outputFileName = 'data.csv';

      // Show the success alert
      this.showAlert = true;
      this.isLoading = false;
    }, 2000); // Simulating backend call delay (2 seconds)
  }

  // Close the alert banner
  closeAlert() {
    this.showAlert = false;
  }
}

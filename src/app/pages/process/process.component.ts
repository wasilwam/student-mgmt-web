import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FileService} from '../../services/file.service';

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

  constructor(private fileService: FileService) {
  }

  // Process File method
  processFile() {
    this.isLoading = true;

    this.fileService.convertFile().subscribe({
      next: data => {
        this.inputFileName = data.from_excel;
        this.outputFileName = data.to_csv;

        this.showAlert = true;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.closeAlert();
      }
    })
  }

  // Close the alert banner
  closeAlert() {
    this.showAlert = false;
  }
}

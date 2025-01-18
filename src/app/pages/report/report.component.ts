import { Component } from '@angular/core';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Student, StudentService} from '../../services/student.service';

@Component({
  selector: 'app-report',
  imports: [
    PaginationComponent,
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  students: Student[] = [];
  paginatedStudents: Student[] = [];
  classes: string[] = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  filters = {
    studentId: '',
    studentClass: '',
    startDate: '',
    endDate: '',
  };
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    // TODO: edit to fetch filtered student instead of client side filtering
    this.studentService.getAllStudents().subscribe((response: Student[]) => {
      this.students = response;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let filtered = this.students;

    if (this.filters.studentId) {
      filtered = filtered.filter((student) =>
        student.studentId
          .toString()
          .toLowerCase()
          .includes(this.filters.studentId.toLowerCase())
      );
    }

    if (this.filters.studentClass) {
      filtered = filtered.filter(
        (student) => student.studentClass === this.filters.studentClass
      );
    }

    if (this.filters.startDate && this.filters.endDate) {
      const startDate = new Date(this.filters.startDate);
      const endDate = new Date(this.filters.endDate);
      filtered = filtered.filter((student) => {
        const dob = new Date(student.DOB);
        return dob >= startDate && dob <= endDate;
      });
    }

    this.updatePagination(filtered);
  }

  updatePagination(filtered: Student[]): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStudents = filtered.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  exportFilteredRecords(): void {
    const filteredRecords = JSON.stringify(this.paginatedStudents, null, 2);
    const blob = new Blob([filteredRecords], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_students.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

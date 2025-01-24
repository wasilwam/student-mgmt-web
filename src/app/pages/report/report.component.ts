import { Component } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Student, StudentService } from '../../services/student.service';
import * as XLSX from 'xlsx';  // Import the xlsx library

interface Filters {
  studentId: string;
  studentClass: string;
  startDate: string;
  endDate: string;
  approvalStatus: 'Pending' | 'Rejected';
}

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
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  students: Student[] = [];
  paginatedStudents: Student[] = [];
  classes: string[] = ['Class1', 'Class2', 'Class3', 'Class4', 'Class5'];
  approvalStatuses: string[] = ['Pending', 'Rejected'];
  filters = {
    studentId: '',
    studentClass: '',
    startDate: '',
    endDate: '',
    approvalStatus: '',
  };
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
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
          .toLowerCase() === this.filters.studentId.toLowerCase());
    }

    if (this.filters.studentClass) {
      filtered = filtered.filter(
        (student) => student.class === this.filters.studentClass
      );
    }

    if (this.filters.startDate && this.filters.endDate) {
      const startDate = new Date(this.filters.startDate);
      const endDate = new Date(this.filters.endDate);
      filtered = filtered.filter((student) => {
        const dob = new Date(student.dob);
        return dob >= startDate && dob <= endDate;
      });
    }

    if (this.filters.approvalStatus) {
      filtered = filtered.filter(student => student.approvalStatus === this.filters.approvalStatus);
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
    const filteredRecords = this.paginatedStudents.map(student => ({
      'Student ID': student.studentId,
      'Firstname': student.firstName,
      'Lastname': student.lastName,
      'Class': student.class,
      'Score': student.score,
      'DOB': student.dob,
      'Status': student.status === 1 ? 'Active' : 'Inactive',
    }));

    // Create a worksheet from the filtered records
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredRecords);

    // Create a workbook from the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Students');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'filtered_students.xlsx');
  }
}

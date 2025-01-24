import { Component, Input } from '@angular/core';
import { Student } from '../../services/student.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-selected-students',
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './selected-students.component.html',
  styleUrl: './selected-students.component.css'
})
export class SelectedStudentsComponent {

  @Input() selectedStudents: Partial<Student>[] = [];
  @Input() studentTotalScore: number = 0;
}

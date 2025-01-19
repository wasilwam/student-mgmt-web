import { Component } from '@angular/core';
import {DashboardTileComponent} from '../../components/dashboard-tile/dashboard-tile.component';
import {StudentService} from '../../services/student.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardTileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  totalNumStudents: number = 0;

  constructor(private studentService: StudentService, private router: Router) {
    
  }

  ngOnInit() {
    this.studentService.getStudentsCount().subscribe({
      next: data => {
        this.totalNumStudents = data.count;
      },
      error: err => {
        console.log(`error fetching students ${err}`);
      }
    })
  }
}

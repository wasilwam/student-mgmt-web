import {Component, Input} from '@angular/core';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-dashboard-tile',
  imports: [],
  templateUrl: './dashboard-tile.component.html',
  styleUrl: './dashboard-tile.component.css'
})
export class DashboardTileComponent {
  @Input() totalNumStudents: number = 0;
}

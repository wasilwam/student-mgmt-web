import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-tile',
  imports: [],
  templateUrl: './dashboard-tile.component.html',
  styleUrl: './dashboard-tile.component.css'
})
export class DashboardTileComponent {
  totalStudents: number = 500; // This value can be dynamically fetched from the backend
  lastRefreshed: number = 10;
}

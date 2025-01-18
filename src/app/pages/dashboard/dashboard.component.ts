import { Component } from '@angular/core';
import {DashboardTileComponent} from '../../components/dashboard-tile/dashboard-tile.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardTileComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

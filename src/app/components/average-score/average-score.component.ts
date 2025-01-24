import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-average-score',
  imports: [NgIf],
  templateUrl: './average-score.component.html',
  styleUrl: './average-score.component.css'
})
export class AverageScoreComponent {

  @Input() average_score: string = '0';
}

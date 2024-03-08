import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  constructor(public game: GameService) {}

  getDesc = (step: number) =>
    step ? 'Go to step #' + step : 'Go to game start';
}

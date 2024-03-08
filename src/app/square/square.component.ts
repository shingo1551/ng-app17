import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-square',
  standalone: true,
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css'],
})
export class SquareComponent {
  @Input() index!: number;

  constructor(private game: GameService) {}

  move = () => {
    this.game.move(this.index);
  };
}

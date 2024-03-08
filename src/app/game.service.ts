import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  history: string[][];
  step = 0;
  xIsNext = true;
  squares: string[];
  winner: string | null;
  status = 'Next player: X';

  constructor() {
    this.history = [Array(9).fill(null)];
    this.squares = this.history[0];
    this.winner = null;

    this.loadStorage();
  }

  changeStep = (value: number) => {
    this.step = value;
    this.xIsNext = value % 2 === 0;
    this.squares = this.history[value];
    this.winner = this.calculateWinner(this.squares);
    this.status = this.winner ? 'Winner: ' + this.winner : 'Next player: ' + (this.xIsNext ? 'X' : 'O');

    this.saveStorage();
  }

  //
  move = (i: number) => {
    const history = this.history.slice(0, this.step + 1);
    const current = history[history.length - 1];
    const squares = current.slice();
    if (this.calculateWinner(squares) || squares[i]) return;

    squares[i] = this.xIsNext ? 'X' : 'O';
    this.history = [...history, squares];
    this.step = history.length;

    this.changeStep(this.step);
  }

  calculateWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const sa = squares[a];
      if (sa && sa === squares[b] && sa === squares[c]) {
        return sa;
      }
    }
    return null;
  }

  //
  loadStorage = () => {
    const str = sessionStorage.getItem('game');
    if (str) {
      const game = JSON.parse(str);
      this.history = game.history;
      this.changeStep(game.step);
    }
  }

  saveStorage() {
    const game = {
      history: this.history,
      step: this.step,
    };
    sessionStorage.setItem('game', JSON.stringify(game));
  }
}

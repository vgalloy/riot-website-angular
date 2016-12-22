import {Component, OnInit, Input} from "@angular/core";
import {LastGame} from "../model/last-game.model";

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent {
  _lastGame:LastGame;
  selected:boolean = false;

  @Input()
  set lastGame(lastGame:LastGame) {
    this._lastGame = lastGame || new LastGame();
  }

  get lastGame() {
    return this._lastGame;
  }

  clicked():void {
    this.selected = !this.selected;
  }

  getBorder():string {
    if (this.selected) {
      return "2px solid yellow";
    }
    return "2px solid";
  }
}

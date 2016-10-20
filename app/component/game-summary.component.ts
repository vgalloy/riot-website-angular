import {Component, Input} from "@angular/core";
import {LastGame} from "../model/last-game";

@Component({
    selector: 'game-summary',
    templateUrl: 'app/html/game-summary.component.html',
    styleUrls: ['app/css/game-summary.component.css']
})
export class GameSummaryComponent {
    _lastGame:LastGame;

    @Input()
    set lastGame(lastGame:LastGame) {
        this._lastGame = lastGame || new LastGame();
    }

    get lastGame() {
        return this._lastGame;
    }
}
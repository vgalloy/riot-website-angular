import { Component, Input } from '@angular/core';
import { LastGame } from '../../model/last-game.model';

@Component({
    selector: 'app-game-summary',
    templateUrl: './game-summary.component.html',
    styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent {
    _lastGame: LastGame;
    selected = false;

    @Input()
    set lastGame(lastGame: LastGame) {
        this._lastGame = lastGame || new LastGame();
        this._lastGame.itemIdList = this._lastGame.itemIdList.sort((a, b) => {
            if (a === 3340) {
                return -1;
            } else if (b === 3340) {
                return 1;
            }
            return 0;
        });
    }

    get lastGame() {
        return this._lastGame;
    }

    clicked(): void {
        this.selected = !this.selected;
    }

    getBorder(): string {
        if (this.selected) {
            return '2px solid yellow';
        }
        return '2px solid';
    }
}

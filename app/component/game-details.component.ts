import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LastGame} from ".././model/last-game";
import {SummonerService} from "../service/summoner.service";
import {GameModel} from "../model/game.model";
import {CachedGameService} from "../service/cached-game.service";
import {PositionTimedEvent} from "../model/position-timed-event";
import {Position} from "../model/position";

@Component({
    selector: 'game-details',
    templateUrl: 'app/html/game-details.component.html',
    styleUrls: ['app/css/game-detail.component.css']
})
export class GameDetailsComponent {

    _lastGames:LastGame[] = [];
    private games:GameModel[] = [];

    constructor(private route:ActivatedRoute,
                private cachedGameService:CachedGameService,
                private router:Router,
                private summonerService:SummonerService) {
    }

    @Input()
    set lastGames(lastGames:LastGame[]) {
        this._lastGames = lastGames || [];
    }

    get lastGames():LastGame[] {
        return this._lastGames.filter(function (lastGame:LastGame) {
            return lastGame.selected;
        });
    }

    /** Ne marche pas du tout */
    get position():Position[] {
        let result:Position[] = this.lastGames
            .map(this.mapLastGameIntoGameModel)
            .filter(function (gameModel:GameModel):boolean {
                return gameModel != null;
            })
            .map(function (gameModel:GameModel):Position[] {
                // TODO prendre le bon joueur
                return gameModel.playerTimelines[0].position.map(function (positionTimedEvent:PositionTimedEvent):Position {
                    return positionTimedEvent.value;
                })
            })
            .reduce(function (previousValue:Position[], currentValue:Position[]) {
                return previousValue.concat(currentValue);
            });
        console.log("result", result);
        return result;
    }

    private mapLastGameIntoGameModel(lastGame:LastGame):GameModel {
        return this.cachedGameService.getGame(lastGame.gameId);
    }
}
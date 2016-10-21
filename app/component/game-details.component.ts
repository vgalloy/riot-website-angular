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
    private _positions:Position[] = [];

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

    get positions():Position[] {
        this.updatePosition();
        console.log("positions", this._positions);
        return this._positions;
    }

    /** Ne marche pas du tout */
    updatePosition(): void{
        let result = this.lastGames
            .map((lastGames:LastGame) => this.mapLastGameIntoGameModel(lastGames))
            .filter((gameModel:GameModel) => {return gameModel != null})
            .map((gameModel:GameModel) => {
                // TODO prendre le bon joueur
                return gameModel.gameInformation.playerTimelines[0].position.map((positionTimedEvent:PositionTimedEvent) => positionTimedEvent.value)
            })
            .reduce((previousValue:Position[], currentValue:Position[]) => previousValue.concat(currentValue), []);
        this._positions = result;
    }

    mapLastGameIntoGameModel(lastGame:LastGame):GameModel {
        return this.cachedGameService.getGame(lastGame.gameId);
    }
}
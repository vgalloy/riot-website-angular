import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { GameModel } from "../model/game.model";
import { CachedGameService } from "../service/cached-game.service";
import { PositionTimedEvent } from "../model/position-timed-event";
import { Position } from "../model/position";
import { PlayerTimeline } from "../model/player-timeline";

@Component({
    selector: 'game-details',
    templateUrl: 'app/html/game-details.component.html',
    styleUrls: ['app/css/game-detail.component.css']
})
export class GameDetailsComponent {

    _lastGames:LastGame[] = [];
    private _positions:Position[] = [];
    @Input()
    playerId:number;

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
        return this._lastGames.filter((lastGame:LastGame) => lastGame.selected);
    }

    get positions():Position[] {
        this.updatePosition();
        return this._positions;
    }

    /** Ne marche pas du tout */
    updatePosition():void {
        let result = this.lastGames
            .map((lastGame:LastGame) => this.cachedGameService.getGame(lastGame.gameId))
            .filter((gameModel:GameModel) => gameModel != null)
            .map((gameModel:GameModel) => {
                let timeline:PlayerTimeline = gameModel.gameInformation.playerTimelines.find((timeLine:PlayerTimeline) => timeLine.playerId == this.playerId);
                console.log("timeline", timeline);

                return timeline.position.map((positionTimedEvent:PositionTimedEvent) => positionTimedEvent.value)
            })
            .reduce((previousValue:Position[], currentValue:Position[]) => previousValue.concat(currentValue), []);
        this._positions = result;
    }

    getLeft(position:Position):string {
        return (position.x * 100 / 14820) + "%";
    }

    getTop(position:Position):string {
        return (100 - (position.y * 100 / 14881)) + "%";
    }
}
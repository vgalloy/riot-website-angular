import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LastGame} from "../model/last-game.model";
import {SummonerService} from "../service/summoner.service";
import {CachedGameService} from "../service/cached-game.service";
import {GameModel} from "../model/game.model";
import {PlayerTimeline} from "../model/player-timeline.model";
import {PositionTimedEvent} from "../model/position-timed-event.model";
import {Position} from "../model/position.model"

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {

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
    // this.updatePosition();
    return this._positions;
  }

  updatePosition():void {
    console.log("update position");
    this._positions = this.lastGames
      .map((lastGame:LastGame) => this.cachedGameService.getGame(lastGame.gameId))
      .filter((gameModel:GameModel) => gameModel != null)
      .map((gameModel:GameModel) => {
        console.log("gameModel", gameModel);
        let timeline:PlayerTimeline = gameModel.gameInformation.playerTimelines.find((timeLine:PlayerTimeline) => timeLine.playerId == this.playerId);
        return timeline.position.map((positionTimedEvent:PositionTimedEvent) => positionTimedEvent.value)
      })
      .reduce((previousValue:Position[], currentValue:Position[]) => previousValue.concat(currentValue), []);
  }

  getLeft(position:Position):string {
    return (position.x * 100 / 14820) + "%";
  }

  getTop(position:Position):string {
    return (100 - (position.y * 100 / 14881)) + "%";
  }
}

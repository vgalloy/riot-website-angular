import {Component, Input} from "@angular/core";
import {CachedGameService} from "../service/cached-game.service";
import {GameModel} from "../model/game.model";
import {PlayerTimeline} from "../model/player-timeline.model";
import {PositionTimedEvent} from "../model/position-timed-event.model";
import {Position} from "../model/position.model";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  @Input()
  selectedGamesId:string[] = [];
  @Input()
  playerId:number;
  positions:Position[] = [];

  constructor(private cachedGameService:CachedGameService) {
  }

  updatePosition():void {
    console.log("update position", this.selectedGamesId);
    this.positions = this.selectedGamesId
        .map((gameId:string) => this.cachedGameService.getGame(gameId))
        .filter((gameModel:GameModel) => gameModel != null)
        .map((gameModel:GameModel) => {
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

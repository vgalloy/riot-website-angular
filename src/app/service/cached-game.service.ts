import { Injectable } from "@angular/core";
import { GameModel } from "../model/game.model";
import { GameService } from "./game.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CachedGameService {

  private cachedGameModel:{ [key:string]:Observable<GameModel>; } = {};

  constructor(private gameService:GameService) {
  }

  getGame(gameId:string):Observable<GameModel> {
    let cachedResult:Observable<GameModel> = this.cachedGameModel[gameId];
    if (cachedResult != null) {
      return cachedResult;
    }
    let result:Observable<GameModel> = this.gameService.getGame(gameId);
    this.cachedGameModel[gameId] = result;
    return result;
  }
}

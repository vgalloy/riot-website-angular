import { Injectable } from '@angular/core';
import {GameModel} from "../model/game.model";
import {GameService} from "./game.service";

@Injectable()
export class CachedGameService {

  private cachedGameModel:{ [key:string]:GameModel; } = {};

  constructor(private gameService:GameService) {
  }

  getGame(gameId:string):GameModel {
    let cachedResult:GameModel = this.cachedGameModel[gameId];
    if (cachedResult != null) {
      return cachedResult;
    }
    this.gameService.getGame(gameId)
      .subscribe(game => {
        this.cachedGameModel[gameId] = game;
      });
  }

}

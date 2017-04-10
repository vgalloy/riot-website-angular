import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ChampionModel } from '../model/champion.model';
import { ChampionService } from './champion.service';

@Injectable()
export class CachedChampionService {

  private cachedGameModel:{ [key:number]:Observable<ChampionModel>; } = {};

  constructor(private championService:ChampionService) {
  }

  getChampion(championId:number):Observable<ChampionModel> {
    let cachedResult:Observable<ChampionModel> = this.cachedGameModel[championId];
    if (cachedResult != null) {
      return cachedResult;
    }
    let result:Observable<ChampionModel> = this.championService.getChampion(championId);
    this.cachedGameModel[championId] = result;
    return result;
  }
}

import {Injectable} from "@angular/core";
import {Region} from "../model/region.model";
import {LastGame} from "../model/last-game.model";
import {GameModel} from "../model/game.model";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class GameService {

  constructor(private http:Http) {
  }

  getGameList(region:Region, summonerId:number, from:Date, to:Date):Observable<LastGame[]> {
    console.log("Fetching lastGame :", Region[region], summonerId, from, to);
    return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" + summonerId + "/lastGames?fromMillis=" + from.getTime() + "&toMillis=" + to.getTime())
      .map(response => response.json() as LastGame[] || [])
      .catch(this.handleError)
  }

  getGame(gameId:string):Observable<GameModel> {
    console.log("Fetching game :", gameId);
    return this.http.get("http://api.3csminute.com/game/" + gameId)
      .map(res => res.json().data as GameModel)
      .catch(this.handleError)
  }

  private handleError(error:Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
}

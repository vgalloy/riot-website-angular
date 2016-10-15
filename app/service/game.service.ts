import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { LastGame } from "../model/last-game";
import { Region } from "../model/region";
import { GameModel } from "../model/game.model";

@Injectable()
export class GameService {

    constructor(private http:Http) {
    }

    getGameList(region:Region, summonerId:number, from:Date, to:Date):Promise<LastGame[]> {
        console.log("Fetching lastGame :", Region[region], summonerId);
        return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" +  summonerId + "/lastGames?from=" + from.getTime() + "&to=" + to.getTime())
            .toPromise()
            .then(response => response.json() as LastGame[])
            .catch(this.handleError)
    }

    getGame(gameId:string):Promise<GameModel> {
        console.log("Fetching game :", gameId);
        return this.http.get("http://api.3csminute.com/game/" + gameId)
            .toPromise()
            .then(response => response.json() as GameModel)
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
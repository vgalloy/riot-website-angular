import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {LastGame} from "../model/last-game";
import {Region} from "../model/region";
import {PlayerTimeline} from "../model/player-timeline";

@Injectable()
export class GameService {

    constructor(private http:Http) {
    }

    getGameList(region:Region, summonerId:number, limit:number = 5):Promise<LastGame[]> {
        console.log("Fetching lastGame : ", Region[region], summonerId);
        return this.http.get("http://server:8081/" + Region[region] + "/summoner/" + summonerId + "/lastGames?limit=" + limit)
            .toPromise()
            .then(response => response.json() as LastGame[])
            .catch(this.handleError)
    }

    getTimeline(region:Region, gameId:number):Promise<PlayerTimeline[]> {
        console.log("Fetching game timeline : ", Region[region], gameId);
        return this.http.get("http://server:8081/game/" + Region[region] + "/" + gameId + "/timelines")
            .toPromise()
            .then(response => response.json() as PlayerTimeline[])
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {LastGame} from "../model/last-game";
import {Region} from "../model/region";

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

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
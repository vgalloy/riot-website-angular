import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Summoner} from "../model/summoner";

@Injectable()
export class SummonerService {

    constructor(private http:Http) {
    }

    getSummoner(summonerName:string):Promise<Summoner> {

        let url = "http://server:8081/EUW/summoner/" + summonerName + "/byName";

        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Summoner)
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
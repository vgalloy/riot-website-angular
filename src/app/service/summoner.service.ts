import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Summoner } from "../model/summoner.model";
import { Observable } from "rxjs/Rx";

@Injectable()
export class SummonerService {

    constructor(private http:Http) {
    }

    getSummonerByName(summonerName:string):Observable<Summoner> {
        console.debug("get summoner by name", summonerName);
        return this.http.get("http://api.3csminute.com/summoners?summonerName=" + summonerName)
            .map(response => response.json() as Summoner[])
            .map(summoners => summoners[0])
            .catch(SummonerService.handleError)
    }

    getSummonerById(summonerId:string):Observable<Summoner> {
        console.debug("get summoner by id", summonerId);
        return this.http.get("http://api.3csminute.com/summoners/" + summonerId)
            .map(response => response.json() as Summoner)
            .catch(SummonerService.handleError)
    }

    private static handleError(error:Response | any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}

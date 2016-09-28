import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Summoner } from "../model/summoner";
import { Region } from "../model/region";

@Injectable()
export class SummonerService {

    constructor(private http:Http) {
    }

    getSummonerByName(region:Region, summonerName:string):Promise<Summoner> {
        console.log("get summoner by name", Region[region], summonerName);
        return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" + summonerName + "/byName")
            .toPromise()
            .then(response => response.json() as Summoner)
            .catch(this.handleError)
    }

    getSummonerById(region:Region, summonerId:number):Promise<Summoner> {
        console.log("get summoner by id", Region[region], summonerId);
        return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" + summonerId + "/byId")
            .toPromise()
            .then(response => response.json() as Summoner)
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
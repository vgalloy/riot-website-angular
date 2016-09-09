import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Summoner } from "../model/summoner";
import { Region } from "../model/region";

@Injectable()
export class SummonerService {

    constructor(private http:Http) {
    }

    getSummoner(region:Region, summonerName:string):Promise<Summoner> {
        return this.http.get("http://149.202.166.194:8081/" + Region[region] + "/summoner/" + summonerName + "/byName")
            .toPromise()
            .then(response => response.json() as Summoner)
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
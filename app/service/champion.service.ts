import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { WinRate } from "../model/win-rate";

@Injectable()
export class ChampionService {

    constructor(private http:Http) {
    }

    getWinRate(championId:number):Promise<WinRate[]> {
        return this.http.get("http://api.3csminute.com/champion/" + championId + "/winRate")
            .toPromise()
            .then(response => response.json() as WinRate[])
            .catch(this.handleError)
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
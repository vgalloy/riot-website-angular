import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WinRate} from "../model/win-rate.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ChampionService {

  constructor(private http:Http) {
  }

  getWinRate(championId:number):Observable<WinRate[]> {
    return this.http.get("http://api.3csminute.com/champion/" + championId + "/winRateByGamePlayed")
      .map(response => response.json() as WinRate[])
      .catch(this.handleError)
  }

  private handleError(error:Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
}

import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {WinRate} from "../model/win-rate.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ChampionService {

  constructor(private http:Http) {
  }

  getWinRate(championId:number):Observable<WinRate[]> {
    return this.http.get("http://api.3csminute.com/champions/" + championId + "/winRateByGamePlayed")
      .map(response => response.json() as WinRate[])
      .catch(ChampionService.handleError)
  }

  getAllChampionWinRateByDay(date:Date):Observable<Map<number, WinRate>> {
    return this.http.get("http://api.3csminute.com/champions/winRateByDate?day=" + Math.floor(date.getTime() / 1000 / 3600 / 24))
        .map(response => response.json() as WinRate[])
        .catch(ChampionService.handleError)
  }

  private static handleError(error:Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }
}

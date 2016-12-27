import {Injectable} from "@angular/core";
import {Http,Response} from "@angular/http";
import {Region} from "../model/region.model";
import {Summoner} from "../model/summoner.model";
import {Observable} from "rxjs/Rx";

@Injectable()
export class SummonerService {

  constructor(private http:Http) {
  }

  getSummonerByName(region:Region, summonerName:string):Observable<Summoner> {
    console.log("get summoner by name", Region[region], summonerName);
    return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" + summonerName + "/byName")
      .map(response => response.json() as Summoner)
      .catch(SummonerService.handleError)
  }

  getSummonerById(region:Region, summonerId:number):Observable<Summoner> {
    console.log("get summoner by id", Region[region], summonerId);
    return this.http.get("http://api.3csminute.com/summoner/" + Region[region] + "/" + summonerId + "/byId")
      .map(response => response.json() as Summoner)
      .catch(SummonerService.handleError)
  }

  private static handleError(error:Response | any) {
    console.error('An error occurred', error);
    return Observable.throw(error.message || error);
  }

}

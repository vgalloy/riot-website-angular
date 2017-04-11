import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Summoner } from '../model/summoner.model';
import { Observable } from 'rxjs/Rx';
import { RankedStatsModel } from '../model/ranked-stats.model';

@Injectable()
export class SummonerService {

    private static handleError(error: Response | any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }

    constructor(private http: Http) {
    }

    getSummonersByName(summonerName: string): Observable<Summoner[]> {
        return this.http.get('http://api.3csminute.com/summoners?regions=EUW&summonerNames=' + summonerName)
            .map(response => response.json() as Summoner[])
            .catch(SummonerService.handleError);
    }

    getSummonerRankedStatsById(summonerId: string): Observable<RankedStatsModel> {
        return this.http.get('http://api.3csminute.com/summoners/' + summonerId + '/rankedStats')
            .map(response => response.json() as RankedStatsModel)
            .catch(SummonerService.handleError);
    }

    getSummonerById(summonerId: string): Observable<Summoner> {
        return this.http.get('http://api.3csminute.com/summoners/' + summonerId)
            .map(response => response.json() as Summoner)
            .catch(SummonerService.handleError);
    }
}

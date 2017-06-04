import { Injectable } from '@angular/core';
import { LastGame } from '../../model/last-game.model';
import { GameModel } from '../../model/game.model';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GameService {

    private static handleError(error: Response | any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }

    constructor(private http: Http) {
    }

    getGameList(summonerId: string, from: Date, to: Date): Observable<LastGame[]> {
        let dateFrom: number = Math.floor(from.getTime() / 3600 / 1000 / 24);
        let dateTo: number = Math.floor(to.getTime() / 3600 / 1000 / 24);
        return this.http.get('http://api.3csminute.com/summoners/' + summonerId + '/lastGames?fromDay=' + dateFrom + '&toDay=' + dateTo)
            .map(response => response.json() as LastGame[] || [])
            .catch(GameService.handleError);
    }

    getGame(gameId: string): Observable<GameModel> {
        return this.http.get('http://api.3csminute.com/games/' + gameId)
            .map(res => res.json() as GameModel)
            .catch(GameService.handleError);
    }
}

import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {LastGame} from ".././model/last-game";
import {SummonerService} from "../service/summoner.service";
import {PlayerTimeline} from "../model/player-timeline";

@Component({
    selector: 'game-details',
    templateUrl: 'app/html/game-details.component.html',
    styleUrls: ['app/css/game-detail.component.css']
})
export class GameDetailsComponent {

    _lastGames:LastGame[];

    game:LastGame;
    name:string = "Summoner Name";
    timelines:PlayerTimeline[];
    constructor(private route:ActivatedRoute,
                private gameService:GameService,
                private router:Router,
                private summonerService:SummonerService) {
    }

    @Input()
    set lastGames(lastGames: LastGame[]) {
        this._lastGames = lastGames || [];
    }

    get lastGames() {
        return this._lastGames;
    }

}
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";
import { Summoner } from "../model/summoner";
import { PlayerTimeline } from "../model/player-timeline";

// Will be used for the right part of the project, along with the map-- Actually unused
@Component({
    selector: 'game-details',
    templateUrl: 'app/html/game-details.component.html',
    styleUrls: ['app/css/game-detail.component.css']
})
export class GameDetailsComponent implements OnInit {
    game:LastGame;
    name:string = "Summoner Name";
    timelines:PlayerTimeline[];
    constructor(private route:ActivatedRoute,
                private gameService:GameService,
                private router:Router,
                private summonerService:SummonerService) {
    }

    ngOnInit():void {
        this.route.params.forEach((params:Params) => {
            let summonerId = params['summonerId'];
            let regionString:string = params['region'];
            let region = Region[regionString];
            let gameId = params['gameId'];
            console.log(params);
            console.log(gameId);
            this.summonerService.getSummonerById(region, summonerId)
                .then(summoner => this.name = summoner.name);

            // to only do when gameId is defined, when a game is visible
            if (gameId) {
                this.gameService.getGame(gameId)
                    .then(game => this.timelines = game.playerTimelines);
            }


        });
    }

}
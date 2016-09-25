import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";
import { Summoner } from "../model/summoner";
import { PlayerTimeline } from "../model/player-timeline";
    
@Component({
    selector: 'game-list',
    templateUrl: 'app/html/game-list.component.html',
    styleUrls: ['app/css/game-detail.component.css','app/css/games.component.css'],
})
export class GameListComponent implements OnInit {
    @Input() summonerName:string;
    gameList:LastGame[];
    name:string = "Summoner Name";
    summonerId:number;
    timelines:Array<PlayerTimeline[]> = [];
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

            this.summonerId = summonerId;

            this.summonerService.getSummonerById(region, summonerId)
                .then(summoner => this.name = summoner.name);

            this.gameService.getGameList(region, summonerId)
                .then(gameList => { 
                    this.gameList = gameList;
                    this.gameList.forEach((game) => { 
                        game.visible = false;
                        
                        this.gameService.getTimeline(region, game.gameId)
                            .then(timelines => {
                                                this.timelines.push(timelines);
                                                });
                    });
                });   
           
        });
    }

    find():void {
        console.log(this.summonerName);
        let region = Region.EUW;

        this.summonerService.getSummonerByName(region, this.summonerName).then(summoner => {
            this.router.navigate(['/summoner', region, summoner.id, 'gameList']);
        });
    }

    onSelect(game:LastGame,gameList:LastGame[]):void {
        gameList.forEach((gameHidden) =>{
        if(gameHidden !== gameList[gameList.indexOf(game)])
            gameHidden.visible = false;
        });
        game.visible = !game.visible;
    }
}
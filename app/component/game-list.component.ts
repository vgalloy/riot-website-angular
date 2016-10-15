import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";
import { Summoner } from "../model/summoner";
import { PlayerTimeline } from "../model/player-timeline";
import { GameModel } from "../model/game.model";
    
@Component({
    selector: 'game-list',
    templateUrl: 'app/html/game-list.component.html',
    styleUrls: ['app/css/game-detail.component.css','app/css/games.component.css'],
})
export class GameListComponent implements OnInit {
    @Input() summonerName:string;
    gameList:LastGame[] = [];
    name:string = "Summoner Name";
    summonerId:number;
    games:GameModel[] = [];
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

            console.log("region", region);
            console.log("summonerId", summonerId);

            this.summonerService.getSummonerById(region, summonerId)
                .then(summoner => this.name = summoner.name);

            this.gameService.getGameList(region, summonerId, new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date())
                .then(gameList => { 
                    this.gameList = gameList;
                    this.gameList.forEach((lastGameModel) => {
                        lastGameModel.visible = false;
                        this.gameService.getGame(lastGameModel.gameId)
                            .then(game => {this.games.push(game);});
                    });
                });   
        });
    }

    find():void {
        console.log(this.summonerName);
        let region = Region.EUW;

        this.summonerService.getSummonerByName(region, this.summonerName).then(summoner => {
            console.log("J'ai trouvé", summoner);
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
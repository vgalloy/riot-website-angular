import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";
import { GameModel } from "../model/game.model";

@Component({
    selector: 'game-list',
    templateUrl: 'app/html/game-list.component.html',
    styleUrls: ['app/css/game-detail.component.css', 'app/css/games.component.css']
})
export class GameListComponent implements OnInit {
    @Input() summonerName:string;
    gameList:LastGame[] = [];
    name:string = "Summoner Name";
    summonerId:number;
    region:Region;
    games:GameModel[] = [];

    selectedGame:LastGame;

    constructor(private route:ActivatedRoute,
                private gameService:GameService,
                private router:Router,
                private summonerService:SummonerService) {

    }

    ngOnInit():void {
        this.route.params.forEach((params:Params) => {
            let summonerId = params['summonerId'];
            let regionString:string = params['region'];

            this.region = Region[regionString];
            this.summonerId = summonerId;

            this.gameList = [];
            this.summonerService.getSummonerById(this.region, this.summonerId)
                .then(summoner => this.name = summoner.name);
            /** Load les game jour par jour pendant sur 30 jour **/
            this.findGame(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date())
        });
    }

    find():void {
        console.log(this.summonerName);
        if (!this.summonerName) {
            return
        }
        let region = Region.EUW;
        this.summonerService.getSummonerByName(region, this.summonerName).then(summoner => {
            this.router.navigate(['/summoner', region, summoner.id, 'gameList']);
        });
    }

    onSelect(game:LastGame):void {
        this.selectedGame = game;
    }

    /**
     * Load the game played during [from, to] in the gameList.
     * The loading is day by day.
     * @param from the first date
     * @param to the last date
     */
    findGame(from:Date, to:Date):void {
        if (from.getTime() > to.getTime()) {
            return;
        } else {
            let date:Date = new Date(to.getTime() - 24 * 3600 * 1000);
            this.gameService.getGameList(this.region, this.summonerId, to, to)
                .then(gameList => {
                    this.gameList = this.gameList.concat(gameList.reverse());
                    this.findGame(from, date);
                })
        }
    }
}
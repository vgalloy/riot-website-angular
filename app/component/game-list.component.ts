import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { LastGame } from ".././model/last-game";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";

@Component({
    selector: 'game-list',
    templateUrl: 'app/html/game-list.component.html',
    styleUrls: ['app/css/game-detail.component.css']
})
export class GameListComponent implements OnInit {
    @Input() summonerName:string;
    gameList:LastGame[];

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
            this.gameService.getGameList(region, summonerId)
                .then(gameList => this.gameList = gameList);
        });
    }

    find():void {
        console.log(this.summonerName);
        let region = Region.EUW;

        this.summonerService.getSummoner(region, this.summonerName).then(summoner => {
            this.router.navigate(['/summoner', region, summoner.id, 'gameList']);
        });
    }

    onSelect(game:LastGame):void {
        game.visible = !game.visible;
        this.gameService.getTimeline(game.region, game.gameId)
            .then(timelines => {
                console.log(timelines);
            });
    }
}
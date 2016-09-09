import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GameService } from "../service/game.service";
import { ChampionService } from "../service/champion.service";

@Component({
    selector: 'game-list',
    templateUrl: 'app/html/champion.component.html',
    // styleUrls: ['app/css/game-detail.component.css']
})
export class ChampionComponent {
    @Input() championId:number;
    winRates;

    constructor(private route:ActivatedRoute,
                private gameService:GameService,
                private router:Router,
                private championService:ChampionService) {

    }

    find():void {
        console.log(this.championId);
        this.championService.getWinRate(this.championId).then(winRates => {
            this.winRates = winRates;
            console.log(this.winRates);
        });
    }

}
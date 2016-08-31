import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {WinRate} from "../model/win-rate";
import {ChampionService} from "../service/champion.service";


@Component({
    selector: 'game-list',
    templateUrl: 'app/html/champion.component.html',
    // styleUrls: ['app/css/game-detail.component.css']
})
export class ChampionComponent {
    @Input() championId:number;
    winRate:WinRate[];

    constructor(private route:ActivatedRoute,
                private gameService:GameService,
                private router:Router,
                private championService:ChampionService) {

    }

    find():void {
        console.log(this.championId);
        this.championService.getWinRate(this.championId).then(winRate => {
            this.winRate = winRate;
            console.log(this.winRate);
        });
    }

}
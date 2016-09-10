import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Summoner } from "../model/summoner";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region";

@Component({
    selector: 'summoner',
    templateUrl: 'app/html/summoner.component.html'
    // styleUrls: ['app/css/summoner.component.css']
})
export class SummonerComponent {
    @Input() summonerName:string = "Ivaranne";
    summoner:Summoner;

    constructor(private summonerService:SummonerService, private router:Router) {

    }

    find():void {
        console.log(this.summonerName);
        this.summonerService.getSummonerByName(Region.EUW, this.summonerName).then(summoner => {
            this.summoner = summoner;
            this.router.navigate(['/summoner', Region[Region.EUW], summoner.id, 'gameList']);
        });
    }
}
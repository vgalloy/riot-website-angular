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
export class SummonerComponent implements OnInit {
    @Input() summonerName:string = "Ivaranne";
    summoner:Summoner;

    constructor(private summonerService:SummonerService, private router:Router) {

    }

    ngOnInit():void {
        this.summonerService.getSummoner(Region.EUW, "Ivaranne").then(summoner => this.summoner = summoner);
    }

    find():void {
        console.log(this.summonerName);
        this.summonerService.getSummoner(Region.EUW, this.summonerName).then(summoner => {
            this.summoner = summoner;
            this.router.navigate(['/summoner', Region[Region.EUW], summoner.id, 'gameList']);
        });
    }
}
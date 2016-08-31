import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router"
import { Summoner } from "../model/summoner";
import { SummonerService } from "../service/summoner.service";

@Component({
    selector: 'summoner',
    templateUrl: 'app/html/summoner.component.html'
    // styleUrls: ['app/css/summoner.component.css']
})
export class SummonerComponent implements OnInit {
    @Input() summonerName:string = "Ivaranne";
    summoner: Summoner;

    constructor(private summonerService:SummonerService, private router:Router) {

    }

    ngOnInit():void {
        this.summonerService.getSummoner("Ivaranne").then(summoner => this.summoner = summoner);
    }

    find():void {
        console.log(this.summonerName);
        this.summonerService.getSummoner(this.summonerName).then(summoner => {
            this.summoner = summoner;
            this.router.navigate(['/summoner', summoner.id, 'gameList']);
        });
    }
}
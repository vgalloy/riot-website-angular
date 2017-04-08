import {Component, OnInit} from "@angular/core";
import {SummonerService} from "../service/summoner.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Summoner} from "../model/summoner.model";

@Component({
    selector: 'app-summoner',
    templateUrl: './summoner.component.html',
    styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
    summonerId: string;
    summoner: Summoner;

    constructor(private summonerService: SummonerService,
                private router: Router,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.summonerId = params['summonerId'];
        });
        this.summonerService.getSummonerById(this.summonerId)
            .subscribe(summoner => this.summoner = summoner);
    }

    move(): void {
        this.router.navigate(['/summoner', this.summonerId, 'gameList']);
    }
}

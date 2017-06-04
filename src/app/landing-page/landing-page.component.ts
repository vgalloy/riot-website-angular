import { Component, Input } from '@angular/core';
import { SummonerService } from '../common/service/summoner.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ChampionService } from '../champion/service/champion.service';
import { Region } from '../model/region.model';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

    @Input()
    searchText: string;
    displayError = false;

    constructor(private summonerService: SummonerService,
                private championService: ChampionService,
                private router: Router) {
    }

    onKey(event: any): void {
        if (event.key === 'Enter') {
            this.find();
        }
        this.championService.autoComplete(this.searchText, Region.EUW)
            .subscribe(result => console.log(result));
    }

    find(): void {
        if (!isNullOrUndefined(this.searchText)) {
            this.summonerService.getSummonersByName(this.searchText).subscribe(
                (summoner) => {
                    if (summoner.length !== 0) {
                        this.router.navigate(['/summoner', summoner[0].summonerId]);
                    } else {
                        this.displayError = true;
                    }
                });
        }
    }
}

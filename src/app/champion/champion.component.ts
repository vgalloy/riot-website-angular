import { Component, Input, OnInit } from '@angular/core';
import { ChampionService } from '../service/champion.service';
import { CachedChampionService } from '../service/cached-champion.service';
import { ChampionInformationModel } from './champion-information.model';

@Component({
    selector: 'app-champion',
    templateUrl: './champion.component.html',
    styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {
    @Input() championId: number;
    champions: ChampionInformationModel[] = [];

    private static computePercentage(a: ChampionInformationModel): number {
        return a.winRate.win / (a.winRate.win + a.winRate.lose);
    }

    constructor(private championService: ChampionService,
                private cachedChampionService: CachedChampionService) {

    }

    ngOnInit(): void {
        this.championService.getAllChampionWinRateByDay(new Date(new Date().getTime() - 24 * 3600 * 1000)).subscribe(winRates => {
            let result: ChampionInformationModel[] = [];
            let winRateId: String[] = Object.keys(winRates);
            winRateId.forEach(function (winRate: string) {
                let id: number = Number(winRateId[winRate]);
                let item: ChampionInformationModel = new ChampionInformationModel();
                item.winRate = winRates[id];
                item.id = id;
                result.push(item);
                this.updateChampionInformation(item);
            });
            result = result.sort((a, b) => ChampionComponent.computePercentage(b) - ChampionComponent.computePercentage(a));
            this.champions = result;
        });
    }

    private updateChampionInformation(championInformation: ChampionInformationModel) {
        this.cachedChampionService.getChampion(championInformation.id)
            .subscribe(champion => championInformation.champion = champion);
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { ChampionService } from '../service/champion.service';
import { CachedChampionService } from '../service/cached-champion.service';
import { ChampionInformationModel } from './champion-information.model';

@Component({
    selector: 'champions-list',
    templateUrl: './champions-list.component.html',
    styleUrls: ['./champions-list.component.css']
})
export class ChampionsListComponent implements OnInit {
    @Input() championId: number;
    champions: ChampionInformationModel[] = [];
    private championIds: number[] = [];

    private static computePercentage(a: ChampionInformationModel): number {
        return a.winRate.win / (a.winRate.win + a.winRate.lose);
    }

    constructor(private championService: ChampionService,
                private cachedChampionService: CachedChampionService) {

    }

    ngOnInit(): void {
        this.championService.getAllChampionWinRateByDay(new Date(new Date().getTime() - 24 * 3600 * 1000))
            .subscribe(winRates => {
                this.champions = Object.keys(winRates)
                    .map(key => {
                        let item: ChampionInformationModel = new ChampionInformationModel();
                        item.winRate = winRates[key];
                        item.id = Number(key);
                        this.updateChampionInformation(item);
                        return item;
                    })
                    .sort((a, b) => ChampionsListComponent.computePercentage(b) - ChampionsListComponent.computePercentage(a));
            });
    }

    public onSelect(championId: number): void {
        let index = this.championIds.indexOf(championId);
        if (-1 === index) {
            this.championIds.push(championId);
        } else {
            this.championIds.splice(index, 1);
        }
    }

    public getBackGround(championId: number): string {
        if (-1 === this.championIds.indexOf(championId)) {
            return '';
        }
        return 'selected';
    }

    // lineChart
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        responsive: true
    };
    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public randomize():void {
        let _lineChartData:Array<any> = new Array(this.lineChartData.length);
        for (let i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
            for (let j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    }

    // events
    public chartClicked(e:any):void {
        console.log("chartClicked", e);
    }

    public chartHovered(e:any):void {
        console.log("chartHovered", e);
    }


    private updateChampionInformation(championInformation: ChampionInformationModel) {
        this.cachedChampionService.getChampion(championInformation.id)
            .subscribe(champion => championInformation.champion = champion);
    }
}

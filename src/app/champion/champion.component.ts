import {Component, Input, OnInit} from "@angular/core";
import {ChampionService} from "../service/champion.service";
import {WinRate} from "../model/win-rate.model";

@Component({
    selector: 'app-champion',
    templateUrl: './champion.component.html',
    styleUrls: ['./champion.component.css']
})
export class ChampionComponent implements OnInit {
    @Input() championId:number;
    winRates:Map<number, WinRate> = new Map();

    constructor(private championService:ChampionService) {

    }

    ngOnInit():void {
        this.championService.getAllChampionWinRateByDay(new Date()).subscribe(winRates => {
            this.winRates = winRates;
            console.log("getAllChampionWinRateByDay", winRates);
        });
    }

    getWinRates() {
        let result = [];

        let winRateId:String[] = Object.keys(this.winRates);
        for (let winRate in winRateId) {
            let id:number = Number(winRateId[winRate]);
            let item = this.winRates[id];
            item["id"] = id;
            result.push(item);
        }

        return result;
    }

    find():void {
        console.log(this.championId);
        this.championService.getWinRate(this.championId).subscribe(winRates => {
            console.log(winRates);
        });
    }
}

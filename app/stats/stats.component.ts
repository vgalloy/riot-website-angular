import {OnInit} from "@angular/core";
import {Component} from "@angular/core";
import {ChampionService, ChampionDetail} from "../champion/index";
import {Stats} from "./stats";

@Component({
    selector: 'heroes-component',
    directives: [ChampionDetail],
})
export class StatsComponent implements OnInit {
    stats:Array<Stats>;
    stat:Stats;

    constructor(private championService:ChampionService) {
        this.stat = new Stats();
    }

    ngOnInit() {
        this.stat = new Stats();
        this.getStats(7);
    }

    getStats(id:Number) {
        this.championService.getStats(id)
            .then(response => {
                this.stat.statarray = response;
            })
            .catch(this.handleError);
    }

    handleError(e:String) {
        //TODO
        console.log("Error ngOnInit" + e);
    }
}
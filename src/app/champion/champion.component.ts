import {Component, Input} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../service/game.service";
import {ChampionService} from "../service/champion.service";

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.css']
})
export class ChampionComponent {
  @Input() championId:number;
  winRates;

  constructor(private route:ActivatedRoute,
              private gameService:GameService,
              private router:Router,
              private championService:ChampionService) {

  }

  find():void {
    console.log(this.championId);
    this.championService.getWinRate(this.championId).subscribe(winRates => {
      this.winRates = winRates;
      console.log(this.winRates);
    });
  }
}

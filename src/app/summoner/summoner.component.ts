import {Component, Input} from "@angular/core";
import {Summoner} from "../model/summoner.model";
import {SummonerService} from "../service/summoner.service";
import {Router} from "@angular/router";
import {Region} from "../model/region.model";

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent {
  @Input() summonerName:string = "Ivaranne";
  summoner:Summoner;

  constructor(private summonerService:SummonerService, private router:Router) {

  }

  find():void {
    console.log(this.summonerName);
    this.summonerService.getSummonerByName(Region.EUW, this.summonerName).subscribe(summoner => {
      this.summoner = summoner;
      this.router.navigate(['/summoner', summoner.summonerId, 'gameList']);
    });
  }
}

import { Component, Input } from "@angular/core";
import { SummonerService } from "../service/summoner.service";
import { Region } from "../model/region.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-find-bar',
  templateUrl: './find-bar.component.html',
  styleUrls: ['./find-bar.component.css']
})
export class FindBarComponent {
  title:string = "3cs minute";
  @Input()
  name:string;

  constructor(private summonerService:SummonerService,
              private router:Router) {
  }

  onChange():void {
    console.log("name", this.name);
  }

  find():void {
    this.summonerService.getSummonerByName(this.name).subscribe(
        (summoner) => {
          if (summoner) {
            this.router.navigate(['/summoner', summoner.summonerId, 'gameList'])
          }
        })
  }
}

import { Component, Input } from "@angular/core";
import { SummonerService } from "../service/summoner.service";
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

  onKey(event:any):void {
    if (event.key === "Enter") {
      this.find();
    }
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

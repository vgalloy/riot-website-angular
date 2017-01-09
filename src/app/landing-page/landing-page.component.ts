import { Component, Input } from "@angular/core";
import { SummonerService } from "../service/summoner.service";
import { Router } from "@angular/router";
import { isNullOrUndefined } from "util";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  @Input()
  searchText:string;

  constructor(private summonerService:SummonerService,
              private router:Router) {
  }

  onKey(event:any):void {
    if (event.key === "Enter") {
      this.find();
    }
  }

  find():void {
    if (!isNullOrUndefined(this.searchText)) {
      this.summonerService.getSummonerByName(this.searchText).subscribe(
          (summoner) => {
            if (summoner) {
              this.router.navigate(['/summoner', summoner.summonerId])
            }
          })
    }
  }
}

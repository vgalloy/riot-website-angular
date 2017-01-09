import { Component, OnInit } from "@angular/core";
import { SummonerService } from "../service/summoner.service";
import { Router, Params, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  summonerId:string;

  constructor(private summonerService:SummonerService,
              private router:Router,
              private route:ActivatedRoute) {

  }

  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      this.summonerId = params['summonerId'];
    });
  }

  move():void {
    this.router.navigate(['/summoner', this.summonerId, 'gameList']);
  }
}

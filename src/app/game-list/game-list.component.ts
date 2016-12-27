import {Component, OnInit, Input} from "@angular/core";
import {LastGame} from "../model/last-game.model";
import {Region} from "../model/region.model";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {GameService} from "../service/game.service";
import {SummonerService} from "../service/summoner.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @Input() summonerName:string;
  gameList:LastGame[] = [];
  selectedGamesId: string[] = [];
  name:string = "Summoner Name";
  summonerId:number;
  region:Region;

  constructor(private route:ActivatedRoute,
              private gameService:GameService,
              private router:Router,
              private summonerService:SummonerService) {

  }

  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      let summonerId = params['summonerId'];
      let regionString:string = params['region'];

      this.region = Region[regionString];
      this.summonerId = summonerId;

      this.gameList = [];
      this.summonerService.getSummonerById(this.region, this.summonerId)
        .subscribe(summoner => this.name = summoner.name);
      this.findGame(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date())
    });
  }

  find():void {
    if (!this.summonerName) {
      return
    }
    let region = Region.EUW;
    this.summonerService.getSummonerByName(region, this.summonerName).subscribe(summoner => {
      this.router.navigate(['/summoner', region, summoner.id, 'gameList']);
    });
  }

  onSelect(game:LastGame):void {
    let index:number = this.selectedGamesId.indexOf(game.gameId);
    if( -1 == index) {
      this.selectedGamesId.push(game.gameId);
    } else {
      this.selectedGamesId.splice(index, 1);
    }
    console.log("At the end", this.selectedGamesId);
  }

  /**
   * Load the game played during [from, to] in the gameList.
   * The loading is day by day.
   * @param from the first date
   * @param to the last date
   */
  findGame(from:Date, to:Date):void {
    if (from.getTime() >= to.getTime()) {
      return;
    } else {
      let date:Date = new Date(to.getTime() - 24 * 3600 * 1000);
      this.gameService.getGameList(this.region, this.summonerId, date, to)
        .subscribe(gameList => {
          this.gameList = this.gameList.concat(gameList.reverse());
          this.findGame(from, date);
        })
    }
  }
}

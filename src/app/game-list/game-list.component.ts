import {Component, OnInit, Input} from "@angular/core";
import {LastGame} from "../model/last-game.model";
import {ActivatedRoute, Params} from "@angular/router";
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
  summonerId:string;

  constructor(private route:ActivatedRoute,
              private gameService:GameService,
              private summonerService:SummonerService) {

  }

  ngOnInit():void {
    this.route.params.forEach((params:Params) => {
      this.summonerId = params['summonerId'];

      this.gameList = [];
      this.summonerService.getSummonerById(this.summonerId)
        .subscribe(summoner => this.name = summoner.summonerName);
      this.findGame(new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date())
    });
  }

  onSelect(game:LastGame):void {
    let index:number = this.selectedGamesId.indexOf(game.gameId);
    if( -1 == index) {
      this.selectedGamesId.push(game.gameId);
    } else {
      this.selectedGamesId.splice(index, 1);
    }
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
      this.gameService.getGameList(this.summonerId, date, to)
        .subscribe(gameList => {
          this.gameList = this.gameList.concat(gameList.reverse());
          this.findGame(from, date);
        })
    }
  }
}

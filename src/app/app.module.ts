import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {GameDetailComponent} from "./game-detail/game-detail.component";
import {ChampionComponent} from "./champion/champion.component";
import {GameListComponent} from "./game-list/game-list.component";
import {GameSummaryComponent} from "./game-summary/game-summary.component";
import {SummonerComponent} from "./summoner/summoner.component";
import {routing} from "./app.routing";
import {GameService} from "./service/game.service";
import {CachedGameService} from "./service/cached-game.service";
import {SummonerService} from "./service/summoner.service";
import {ChampionService} from "./service/champion.service";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    GameDetailComponent,
    ChampionComponent,
    GameListComponent,
    GameSummaryComponent,
    SummonerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    GameService,
    CachedGameService,
    SummonerService,
    ChampionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http'

import { routing } from './app.routing';

import { AppComponent }  from './component/app.component';
import { SummonerComponent } from "./component/summoner.component";
import { GameListComponent} from "./component/game-list.component";
import { ChampionComponent } from "./component/champion.component";

import { SummonerService } from "./service/summoner.service";
import { GameService } from './service/game.service'
import { ChampionService } from "./service/champion.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        SummonerComponent,
        GameListComponent,
        ChampionComponent
    ],
    providers: [
        GameService,
        SummonerService,
        ChampionService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
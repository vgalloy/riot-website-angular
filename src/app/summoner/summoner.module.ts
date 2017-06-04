import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummonerComponent } from './summoner/summoner.component';
import { CommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HttpModule } from '@angular/http';
import { GameService } from './service/game.service';
import { CachedGameService } from './service/cached-game.service';
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        HttpModule,
        BrowserModule,
    ],
    providers: [
        GameService,
        CachedGameService
    ],
    declarations: [
        SummonerComponent,
        GameSummaryComponent,
        GameListComponent,
        GameDetailComponent
    ],
    exports: [
        SummonerComponent,
        GameSummaryComponent,
        GameListComponent,
        GameDetailComponent
    ]
})
export class SummonerModule {
}

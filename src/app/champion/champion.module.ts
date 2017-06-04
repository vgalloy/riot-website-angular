import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';
import { ChampionsListComponent } from './champion-list/champions-list.component';
import { HttpModule } from '@angular/http';
import { ChampionService } from './service/champion.service';
import { CachedChampionService } from './service/cached-champion.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        HttpModule,
        BrowserModule,
        ChartsModule
    ],
    providers: [
        ChampionService,
        CachedChampionService
    ],
    declarations: [
        ChampionsListComponent
    ],
    exports: [
        ChampionsListComponent
    ]
})
export class ChampionModule {

}
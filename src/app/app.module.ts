import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './common/app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChartsModule } from 'ng2-charts';
import { SummonerModule } from './summoner/summoner.module';
import { CommonModule } from './common/common.module';
import { ChampionModule } from './champion/champion.module';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent
    ],
    imports: [
        CommonModule,
        ChampionModule,
        SummonerModule,
        ChartsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

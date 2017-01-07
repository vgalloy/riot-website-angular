import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SummonerComponent } from "./summoner/summoner.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameDetailComponent } from "./game-detail/game-detail.component";
import { ChampionComponent } from "./champion/champion.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const appRoutes:Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'summoners',
        component: SummonerComponent
    },
    {
        path: 'summoner/:summonerId/gameList',
        component: GameListComponent
    },
    {
        path: 'summoner/:summonerId/gameList',
        component: GameDetailComponent
    },
    {
        path: 'champion',
        component: ChampionComponent
    }
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

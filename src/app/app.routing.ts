import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummonerComponent } from './summoner/summoner.component';
import { GameListComponent } from './game-list/game-list.component';
import { ChampionComponent } from './champion/champion.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'summoner/:summonerId',
        component: SummonerComponent
    },
    {
        path: 'summoner/:summonerId/gameList',
        component: GameListComponent
    },
    {
        path: 'champion',
        component: ChampionComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

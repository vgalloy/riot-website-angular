import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummonerComponent } from '../summoner/summoner/summoner.component';
import { GameListComponent } from '../summoner/game-list/game-list.component';
import { ChampionsListComponent } from '../champion/champion-list/champions-list.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

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
        component: ChampionsListComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

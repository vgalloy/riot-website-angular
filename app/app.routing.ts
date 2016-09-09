import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummonerComponent } from "./component/summoner.component";
import { GameListComponent } from "./component/game-list.component";
import { ChampionComponent } from "./component/champion.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/summoners',
        pathMatch: 'full'
    },
    {
        path: 'summoners',
        component: SummonerComponent
    },
    {
        path: 'summoner/:region/:summonerId/gameList',
        component: GameListComponent
    },
    {
        path: 'champion',
        component: ChampionComponent
    }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
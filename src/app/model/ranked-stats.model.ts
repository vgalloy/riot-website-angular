import { ChampionRankedModel } from './champion-ranked.model';

export class RankedStatsModel {
    summonerId: string;
    champions: ChampionRankedModel[];
    modifyDate: number;
}

import { WinRate } from '../model/win-rate.model';
import { ChampionModel } from '../model/champion.model';

export class ChampionInformationModel {
    id: number;
    winRate: WinRate;
    champion: ChampionModel;
}
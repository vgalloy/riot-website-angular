import { PlayerTimeline } from "./player-timeline";
export class GameModel {
    gameId:string;
    lastUpdate:number;
    playerTimelines:PlayerTimeline[];
}
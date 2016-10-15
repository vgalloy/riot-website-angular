import { Region } from "./region";
export class LastGame {
    assist:number;
    championId:number;
    death:number;
    gameId:string;
    kill:number;
    region:Region;
    winner:boolean;

    visible:boolean; // TODO C'est juste horrible
}
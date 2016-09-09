import { Region } from "./region";
import { IntTimedEvent } from "./int-timed-event";
import { PositionTimedEvent } from "./position-timed-event";

export class PlayerTimeline {
    region:Region;
    playerId:number;
    farming:IntTimedEvent[];
    gold:IntTimedEvent[];
    position:PositionTimedEvent[];
}
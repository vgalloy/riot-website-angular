import { Region } from "./region.model";
import { IntTimedEvent } from "./int-timed-event.model";
import { PositionTimedEvent } from "./position-timed-event.model";

export class PlayerTimeline {
    region:Region;
    summonerId:string;
    farming:IntTimedEvent[];
    gold:IntTimedEvent[];
    position:PositionTimedEvent[];
}

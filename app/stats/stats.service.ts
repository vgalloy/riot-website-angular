import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export class StatsService {
    private base_url = "http://86.247.225.32:18080";


    constructor(private http:Http) {
    }

    getStats(id:Number):Promise<Array<Number>> {
        var GET_STATS = this.base_url + "/champion/" + id + "/winRate";
        console.log("url : " + GET_STATS);
        return this.http.get(GET_STATS)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    handleError() {
        //TODO
        console.log("Error");
    }


}
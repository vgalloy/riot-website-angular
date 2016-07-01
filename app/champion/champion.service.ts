import {Http} from "@angular/http";
import {Champion} from "./champion";
import "rxjs/add/operator/toPromise";

export class ChampionService {

    private base_url = "http://86.247.225.32:18080/";
    constructor(private http:Http) {
    }

    getHero(id:Number):Promise<Champion> {
        return this.http.get(this.base_url+"/champion/"+id+"/winrate")
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    handleError(){
        //TODO
        console.log("Error");
    }


}
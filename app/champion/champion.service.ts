import {Http} from "@angular/http";
import {Champion} from "./champion";
import "rxjs/add/operator/toPromise";

export class ChampionService {

    private heroesUrl = "bonjour";
    constructor(private http:Http) {
    }

    getHeroes():Promise<Champion> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    handleError(){
        //TODO
        console.log("Error");
    }


}
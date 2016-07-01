import {Http} from "@angular/http";
import {Champion} from "./champion";
import "rxjs/add/operator/toPromise";
import {Injectable} from "@angular/core";

@Injectable()
export class ChampionService {

    private base_url = "http://86.247.225.32:18080";

    private GET_CHAMPIONS = this.base_url; //TODO change url to get all champions


    constructor(private http:Http) {
    }

    getHeroes():Promise<Array<Champion>> {
        return this.http.get(this.GET_CHAMPIONS)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    
    handleError() {
        //TODO
        console.log("Error");
    }


}
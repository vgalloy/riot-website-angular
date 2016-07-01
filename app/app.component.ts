import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {ChampionService} from "./champion/champion.service";

@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS, ChampionService
    ]
})
@RouteConfig([])
export class AppComponent {
    title = 'Stats Champions';

}
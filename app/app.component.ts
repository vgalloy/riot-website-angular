import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";

@Component({
    selector: 'my-app',
    styleUrls: ['app/app.component.css'],
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([])
export class AppComponent {
    title = 'Stats Champions';
}
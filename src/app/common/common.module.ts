import { NgModule } from '@angular/core';
import { FindBarComponent } from './find-bar/find-bar.component';
import { SummonerService } from './service/summoner.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
@NgModule({
    declarations: [
        FindBarComponent
    ],
    imports: [
        HttpModule,
        FormsModule,
        routing
    ],
    exports: [
        FindBarComponent
    ],
    providers: [
        SummonerService
    ]
})
export class CommonModule {

}
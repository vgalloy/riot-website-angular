import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-find-bar',
  templateUrl: './find-bar.component.html',
  styleUrls: ['./find-bar.component.css']
})
export class FindBarComponent {
  title:string = "3cs minute";
  @Input()
  name:string;

  constructor() {
  }

  onChange():void {
    console.log("name", this.name);
  }
}

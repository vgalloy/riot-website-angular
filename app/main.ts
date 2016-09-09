// The browser platform with a compiler
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

// The app module

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
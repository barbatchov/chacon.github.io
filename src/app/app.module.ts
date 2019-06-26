import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app-layout.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { P404Component } from './p404/p404.component';
import { GatewayModule } from './gateway/gateway.module';
import { PeripheralModule } from './peripheral/peripheral.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    P404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    GatewayModule,
    PeripheralModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

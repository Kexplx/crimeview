import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CountyModule } from './county/county.module';
import { MapModule } from './map/map.module';
import { CityModule } from './city/city.module';
import { RouteOverviewModule } from './route-overview/route-overview.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CityModule,
    HttpClientModule,
    CountyModule,
    MapModule,
    RouteOverviewModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

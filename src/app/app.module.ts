import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigatorModule } from './navigator/navigator.module';
import { CountyModule } from './county/county.module';
import { MapModule } from './map/map.module';
import { CityModule } from './city/city.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CityModule,
    HttpClientModule,
    NavigatorModule,
    CountyModule,
    MapModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

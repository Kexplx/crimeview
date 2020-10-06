import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DistrictModule } from './district/district.module';
import { MapModule } from './map/map.module';
import { CitySearchModule } from './city-search/city-search.module';
import { SearchDetailsModule } from './search-details/search-details.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CitySearchModule,
    HttpClientModule,
    DistrictModule,
    MapModule,
    SearchDetailsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

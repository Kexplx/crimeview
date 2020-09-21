import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CountyModule } from './county/county.module';
import { MapModule } from './map/map.module';
import { CityModule } from './city/city.module';
import { SearchDetailsModule } from './search-details/search-details.module';
import { NotifyDialogComponent } from './notify-dialog.component';

@NgModule({
  declarations: [AppComponent, NotifyDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CityModule,
    HttpClientModule,
    CountyModule,
    MapModule,
    SearchDetailsModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { CityModule } from './city/city.module';
import { MapComponent } from './map/map.component';

export const predictionsService = new InjectionToken('predictionsService');
export const predictionsServiceFactory = () => new google.maps.places.AutocompleteService();

@NgModule({
  declarations: [AppComponent, MapComponent, NavigatorComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, CityModule],

  bootstrap: [AppComponent],
})
export class AppModule {}

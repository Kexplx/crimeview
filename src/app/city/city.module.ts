import { NgModule, InjectionToken } from '@angular/core';
import { CityInputComponent } from './city-list/city-input/city-input.component';
import { CityListComponent } from './city-list/city-list.component';
import { SharedModule } from '../shared/shared.module';
import { CityService } from './city.service';

@NgModule({
  declarations: [CityInputComponent, CityListComponent],
  imports: [SharedModule],
  providers: [
    CityService,
    {
      provide: google.maps.places.AutocompleteService,
      useClass: google.maps.places.AutocompleteService,
    },
    { provide: google.maps.Geocoder, useClass: google.maps.Geocoder },
  ],
  exports: [CityListComponent],
})
export class CityModule {}

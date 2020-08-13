import { NgModule, InjectionToken } from '@angular/core';
import { CityListComponent } from './city-list/city-list.component';
import { SharedModule } from '../shared/shared.module';
import { CityService } from './city.service';
import { CityInputComponent } from './city-input/city-input.component';

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

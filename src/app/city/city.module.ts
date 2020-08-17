import { NgModule } from '@angular/core';
import { CityListComponent } from './city-list/city-list.component';
import { SharedModule } from '../shared/shared.module';
import { CityService } from './city.service';
import { CityInputComponent } from './city-input/city-input.component';

@NgModule({
  declarations: [CityInputComponent, CityListComponent],
  imports: [SharedModule],
  providers: [CityService, google.maps.Geocoder, google.maps.places.AutocompleteService],
  exports: [CityListComponent],
})
export class CityModule {}

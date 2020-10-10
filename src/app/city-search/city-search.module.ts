import { NgModule } from '@angular/core';
import { CityFormComponent } from './city-form/city-form.component';
import { SharedModule } from '../shared/shared.module';
import { CityInputComponent } from './city-input/city-input.component';
import { PredictionPipe } from './city-input/prediction.pipe';

@NgModule({
  declarations: [
    CityInputComponent,
    CityFormComponent,
    PredictionPipe,
  ],
  imports: [SharedModule],
  providers: [google.maps.Geocoder, google.maps.places.AutocompleteService],
  exports: [CityFormComponent],
})
export class CitySearchModule {}

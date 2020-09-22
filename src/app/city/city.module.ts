import { NgModule } from '@angular/core';
import { CityFormComponent } from './city-form/city-form.component';
import { SharedModule } from '../shared/shared.module';
import { CityService } from './city.service';
import { CityInputComponent } from './city-input/city-input.component';
import { PredictionPipe } from './city-input/prediction.pipe';
import { IsCheckedPipe } from './city-form/is-checked.pipe';
import { CityPlaceholderComponent } from './city-form/city-placeholder.component';

@NgModule({
  declarations: [
    CityInputComponent,
    CityFormComponent,
    PredictionPipe,
    IsCheckedPipe,
    CityPlaceholderComponent,
  ],
  imports: [SharedModule],
  providers: [CityService, google.maps.Geocoder, google.maps.places.AutocompleteService],
  exports: [CityFormComponent],
})
export class CityModule {}

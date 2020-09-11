import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map.component';
import { MapboxMap } from './mapbox-map';

@NgModule({
  declarations: [MapComponent],
  imports: [SharedModule],
  providers: [MapboxMap],
  exports: [MapComponent],
})
export class MapModule {}

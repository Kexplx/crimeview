import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map.component';
import { MapboxConfig } from './mapbox-config';

@NgModule({
  declarations: [MapComponent],
  imports: [SharedModule],
  providers: [MapboxConfig],
  exports: [MapComponent],
})
export class MapModule {}

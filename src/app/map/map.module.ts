import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MapComponent } from './map.component';
import { MapService } from './map.service';

@NgModule({
  declarations: [MapComponent],
  imports: [SharedModule],
  providers: [MapService],
  exports: [MapComponent],
})
export class MapModule {}

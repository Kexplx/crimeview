import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClickedDistrictDetailsComponent } from './clicked-district-details/clicked-district-details.component';
import { ValuesPipe } from './clicked-district-details/values.pipe';
import { SuspectsMigPipe } from './clicked-district-details/suspects-mig.pipe';

@NgModule({
  declarations: [
    SearchDetailsComponent,
    ValuesPipe,
    CityNamesPipe,
    SuspectsMigPipe,
    ClickedDistrictDetailsComponent,
  ],
  imports: [SharedModule, NgxChartsModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

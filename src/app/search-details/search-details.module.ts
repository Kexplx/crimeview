import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { DistrictTableComponent } from './district-table/district-table.component';
import { DistrictDetailsComponent } from './district-table/district-details/district-details.component';
import { ValuesPipe } from './district-table/district-details/values.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SuspectsMigPipe } from './district-table/district-details/suspects-mig.pipe';

@NgModule({
  declarations: [
    SearchDetailsComponent,
    ValuesPipe,
    CityNamesPipe,
    DistrictTableComponent,
    DistrictDetailsComponent,
    SuspectsMigPipe,
  ],
  imports: [SharedModule, NgxChartsModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

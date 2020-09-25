import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { DistrictTableComponent } from './district-table/district-table.component';

@NgModule({
  declarations: [SearchDetailsComponent, CityNamesPipe, DistrictTableComponent],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

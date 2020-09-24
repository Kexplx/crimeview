import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { DistrictTableComponent } from './district-table/district-table.component';
import { TypePipe } from './district-table/type.pipe';
import { StatePipe } from './district-table/state.pipe';

@NgModule({
  declarations: [SearchDetailsComponent, CityNamesPipe, DistrictTableComponent, TypePipe, StatePipe],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

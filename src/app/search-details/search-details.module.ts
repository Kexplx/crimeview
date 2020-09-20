import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { CountyTableComponent } from './county-table/county-table.component';
import { TypePipe } from './county-table/type.pipe';
import { CrimeRatePipe } from './county-table/crime-rate.pipe';
import { StatePipe } from './county-table/state.pipe';

@NgModule({
  declarations: [
    SearchDetailsComponent,
    CityNamesPipe,
    CountyTableComponent,
    TypePipe,
    CrimeRatePipe,
    StatePipe,
  ],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

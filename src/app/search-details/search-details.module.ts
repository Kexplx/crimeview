import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { CountyTableComponent } from './county-table/county-table.component';
import { CountyTypePipe } from './county-table/county-type.pipe';
import { CrimeRatePipe } from './county-table/crime-rate.pipe';

@NgModule({
  declarations: [SearchDetailsComponent, CityNamesPipe, CountyTableComponent, CountyTypePipe, CrimeRatePipe],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

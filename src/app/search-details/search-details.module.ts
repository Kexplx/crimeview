import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { CountyTableComponent } from './county-table/county-table.component';

@NgModule({
  declarations: [SearchDetailsComponent, CityNamesPipe, CountyTableComponent],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

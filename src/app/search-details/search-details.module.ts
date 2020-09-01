import { NgModule } from '@angular/core';
import { SearchDetailsComponent } from './search-details.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { CountyTableComponent } from './county-table/county-table.component';
import { CountyTypePipe } from './county-table/county-type.pipe';

@NgModule({
  declarations: [SearchDetailsComponent, CityNamesPipe, CountyTableComponent, CountyTypePipe],
  imports: [SharedModule],
  exports: [SearchDetailsComponent],
})
export class SearchDetailsModule {}

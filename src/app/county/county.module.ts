import { NgModule } from '@angular/core';
import { COUNTY_CRIME_RATES } from './county-crimerates';
import { CountyService } from './county.service';

@NgModule({
  providers: [CountyService, { provide: 'COUNTY_CRIME_RATES', useValue: COUNTY_CRIME_RATES }],
})
export class CountyModule {}

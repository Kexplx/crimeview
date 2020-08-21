import { NgModule } from '@angular/core';
import { COUNTY_CRIME_RATES } from './county-crimerates';

@NgModule({
  providers: [{ provide: 'COUNTY_CRIME_RATES', useValue: COUNTY_CRIME_RATES }],
})
export class CountyModule {}

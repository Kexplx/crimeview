import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COUNTY_CRIME_RATES } from './county-crimerates';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: 'COUNTY_CRIME_RATES', useValue: COUNTY_CRIME_RATES }],
})
export class CountyModule {}

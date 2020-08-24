import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteOverviewComponent } from './route-overview.component';
import { SharedModule } from '../shared/shared.module';
import { CityNamesPipe } from './city-names.pipe';
import { CountyTableComponent } from './county-table/county-table.component';

@NgModule({
  declarations: [RouteOverviewComponent, CityNamesPipe, CountyTableComponent],
  imports: [SharedModule],
  exports: [RouteOverviewComponent],
})
export class RouteOverviewModule {}

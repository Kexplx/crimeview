import { NgModule } from '@angular/core';
import { DistrictService } from './district.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  providers: [DistrictService],
})
export class DistrictModule {}

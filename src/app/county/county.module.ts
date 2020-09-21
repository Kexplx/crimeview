import { NgModule } from '@angular/core';
import { CountyService } from './county.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  providers: [CountyService],
})
export class CountyModule {}

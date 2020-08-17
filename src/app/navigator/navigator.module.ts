import { NgModule } from '@angular/core';
import { NavigatorComponent } from './navigator.component';
import { SharedModule } from '../shared/shared.module';
import { CountyService } from './county.service';

@NgModule({
  declarations: [NavigatorComponent],
  imports: [SharedModule],
  providers: [CountyService],
})
export class NavigatorModule {}

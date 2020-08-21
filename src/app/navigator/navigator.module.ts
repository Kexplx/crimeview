import { NgModule } from '@angular/core';
import { NavigatorComponent } from './navigator.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigatorComponent],
  imports: [SharedModule],
  providers: [],
  exports: [NavigatorComponent],
})
export class NavigatorModule {}

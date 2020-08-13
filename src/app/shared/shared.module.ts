import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from './ng-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [NgMaterialModule, CommonModule, FormsModule],
})
export class SharedModule {}

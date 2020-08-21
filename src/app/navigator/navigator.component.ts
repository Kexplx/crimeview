import { Component, OnInit } from '@angular/core';
import { City } from '../city/models/city';
import { CountyService } from '../county/county.service';
import { Subject, Observable } from 'rxjs';
import { County } from '../county/models/county';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent {}

import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { City } from './city/models/city';
import { County } from './county/models/county';
import { switchMap } from 'rxjs/operators';
import { CountyService } from './county/county.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly onSearch$ = new Subject<City[]>();

  readonly counties$: Observable<County[]> = this.onSearch$.pipe(
    switchMap(cities => this.countyService.getCounties(cities)),
  );

  constructor(private readonly countyService: CountyService) {}

  onSearchStarted(cities: City[]): void {
    this.onSearch$.next(cities);
  }
}

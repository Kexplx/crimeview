import { Component } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DistrictService } from 'src/app/district/district.service';
import { District } from 'src/app/district/interfaces/district';
import { MapService } from 'src/app/map/map.service';
import { Search, SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-clicked-district-details',
  templateUrl: './clicked-district-details.component.html',
  styleUrls: ['./clicked-district-details.component.scss'],
})
export class ClickedDistrictDetailsComponent {
  columnsToDisplay: string[] = [
    'totalOffencesCount',
    'relativeOffencesCount',
    'nonGermanSuspectsCount',
  ];

  districtClick$: Observable<District | undefined> = merge(
    this.mapService.districtClick$,
    this.searchService.search$,
  ).pipe(
    map(val => {
      if (this.isString(val)) {
        // Distrct was clicked.
        return this.districtService.getDistrict(val);
      }

      // New search started.
      // Emit undefined to trigger *ngIf; else in template
      return of(undefined);
    }),
    switchMap(val => val),
  );

  constructor(
    private mapService: MapService,
    private districtService: DistrictService,
    private searchService: SearchService,
  ) {}

  private isString(val: string | Search): val is string {
    return typeof val === 'string';
  }
}

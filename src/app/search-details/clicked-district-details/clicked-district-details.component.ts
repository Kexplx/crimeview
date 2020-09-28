import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DistrictService } from 'src/app/district/district.service';
import { District } from 'src/app/district/interfaces/district';
import { MapService } from 'src/app/map/map.service';

@Component({
  selector: 'app-clicked-district-details',
  templateUrl: './clicked-district-details.component.html',
  styleUrls: ['./clicked-district-details.component.scss'],
})
export class ClickedDistrictDetailsComponent {
  districtClick$: Observable<District | undefined> = this.mapService.districtClick$.pipe(
    switchMap(code => this.districtService.getDistrict(code)),
  );

  constructor(private mapService: MapService, private districtService: DistrictService) {}

  columnsToDisplay: string[] = [
    'totalOffencesCount',
    'relativeOffencesCount',
    'nonGermanSuspectsCount',
  ];
}

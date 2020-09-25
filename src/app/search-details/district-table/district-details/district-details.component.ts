import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { District } from 'src/app/district/interfaces/district';

@Component({
  selector: 'app-district-details',
  templateUrl: './district-details.component.html',
  styleUrls: ['./district-details.component.scss'],
})
export class DistrictDetailsComponent {
  @Input() district: District | undefined;

  columnsToDisplay: string[] = ['totalOffencesCount', 'solvedCasesCount', 'nonGermanSuspectsCount'];
}

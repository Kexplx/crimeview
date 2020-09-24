import { Component, Input } from '@angular/core';
import { County } from '../../county/interfaces/county';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-county-table',
  templateUrl: './county-table.component.html',
  styleUrls: ['./county-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CountyTableComponent {
  @Input() counties: County[] | undefined;

  displayedColumns: string[] = ['name', 'state', 'crimeRate'];

  expandedCounty: County | undefined;
}

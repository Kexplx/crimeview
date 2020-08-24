import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { County } from '../../county/models/county';

@Component({
  selector: 'app-county-table',
  templateUrl: './county-table.component.html',
  styleUrls: ['./county-table.component.scss'],
})
export class CountyTableComponent {
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;
  @Input() set counties(counties: County[] | undefined) {
    if (counties) {
      this.matTableDataSource = new MatTableDataSource(counties);
      this.matTableDataSource.sort = this.sort;
    }
  }
  displayedColumns: string[] = ['name', 'state', 'crimeRate'];
  matTableDataSource: MatTableDataSource<County> | undefined;
}

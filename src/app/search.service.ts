import { Injectable } from '@angular/core';
import { City } from './city/interfaces/city';
import { County } from './county/interfaces/county';
import { Observable, Subject } from 'rxjs';
import { CountyService } from './county/county.service';

export interface Search {
  type: 'Polygon' | 'Line' | 'Radius';
  cities: City[];
  counties: County[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _search = new Subject<Search>();

  get search$(): Observable<Search> {
    return this._search.asObservable();
  }

  constructor(private countyService: CountyService) {}

  handleSearchRequest(cities: City[]): void {
    this.countyService.getCounties(cities).subscribe(counties => {
      const route: Search = {
        cities,
        counties,
        type: this.getSearchType(cities),
      };

      this._search.next(route);
    });
  }

  private getSearchType({ length }: City[]): 'Polygon' | 'Line' | 'Radius' {
    return length === 1 ? 'Radius' : length === 2 ? 'Line' : 'Polygon';
  }
}

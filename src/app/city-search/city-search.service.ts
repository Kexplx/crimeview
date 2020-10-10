import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DistrictService } from '../district/district.service';
import { District } from '../district/interfaces/district';
import { City } from './interfaces/city';

export interface Search {
  type: 'Polygon' | 'Line' | 'Radius';
  cities: City[];
  districts: District[];
}

@Injectable({
  providedIn: 'root',
})
export class CitySearchService {
  private searchSubject = new Subject<Search>();
  search$ = this.searchSubject.asObservable();

  private isSearchingSubject = new Subject<boolean>();
  isSearching$ = this.isSearchingSubject.asObservable();

  constructor(private districtService: DistrictService) {}

  handleSearchRequest(cities: City[]): void {
    this.isSearchingSubject.next(true);
    this.districtService.getDistricts(cities).subscribe(districts => {
      const route: Search = {
        cities,
        districts,
        type: this.getSearchType(cities),
      };

      this.searchSubject.next(route);
      this.isSearchingSubject.next(false);
    });
  }

  private getSearchType({ length }: City[]): 'Polygon' | 'Line' | 'Radius' {
    return length === 1 ? 'Radius' : length === 2 ? 'Line' : 'Polygon';
  }
}

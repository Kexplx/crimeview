import { Injectable } from '@angular/core';
import { City } from './city/models/city';
import { County } from './county/models/county';
import { Subject, Observable } from 'rxjs';
import { CountyService } from './county/county.service';

export interface Route {
  type: 'Polygon' | 'Line' | 'Radius';
  cities: City[];
  counties: County[];
}

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private _route = new Subject<Route>();

  get route$(): Observable<Route> {
    return this._route.asObservable();
  }

  constructor(private countyService: CountyService) {}

  handleSearchRequest(cities: City[]): void {
    this.countyService.getCounties(cities).subscribe(counties => {
      const route: Route = {
        cities,
        counties,
        type: this.getRouteType(cities),
      };

      this._route.next(route);
    });
  }

  private getRouteType({ length }: City[]): 'Polygon' | 'Line' | 'Radius' {
    return length === 1 ? 'Radius' : length === 2 ? 'Line' : 'Polygon';
  }
}

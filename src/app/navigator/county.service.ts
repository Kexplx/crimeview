import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city/city.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { COUNTRY_CRIME_RATES } from './county-crimerates';

const POLYGON_API =
  'https://public.opendatasoft.com/api/records/1.0/search/?dataset=landkreise-in-germany&q=&facet=name_1&facet=name_2&facet=type_2&geofilter.polygon=';

export interface County {
  name: string;
  state: string;
  type: string;
  countyCode: number;
  crimeRate: number | undefined;
  geoShape: {
    type: 'Polygon' | 'Multipolygon';
    coordinates: number[][];
  };
}

interface CountyResponse {
  name_1: string; // Bundesland
  name_2: string; // Name Landkreis
  cca_2: string; // County Code
  type_2: string; // type
  geo_shape: {
    type: 'Polygon' | 'Multipolygon';
    coordinates: number[][];
  };
}

@Injectable()
export class CountyService {
  constructor(private readonly httpClient: HttpClient) {}

  getCounties(cities: City[]): Observable<County> {
    return this.getCountiesResponse(cities).pipe(
      switchMap(countyResponses => this.mapCountyResponseToCrimeRate(countyResponses)),
    );
  }

  private mapCountyResponseToCrimeRate(countieResponses: CountyResponse[]): County[] {
    return countieResponses.map<County>(cr => ({
      countyCode: +cr.cca_2,
      name: cr.name_1,
      state: cr.name_2,
      type: cr.type_2,
      geoShape: cr.geo_shape,
      crimeRate: COUNTRY_CRIME_RATES.get(+cr.cca_2),
    }));
  }

  private getCountiesResponse(cities: City[]): Observable<CountyResponse[]> {
    const type = cities.length === 3 ? 'polygon' : 'route';
    const url = this.buildUrl(cities, type);

    return this.httpClient
      .get<{ records: CountyResponse[] }>(url)
      .pipe(map(({ records }) => records));
  }

  // prettier-ignore
  private buildUrl(cities: City[], type: 'polygon' | 'route' | 'radius'): string {
    switch (type) {
      case 'route':
        return `${POLYGON_API}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[1].lat},${cities[1].lng + Number.MIN_VALUE})`;
      case 'polygon':
        return `${POLYGON_API}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[2].lat},${cities[2].lng})`;
      case 'radius':
        return '';
    }
  }
}

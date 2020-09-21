import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city/interfaces/city';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { County } from './interfaces/county';
import { OsmCounty } from './interfaces/osm-county';
import { COUNTY_CRIME_RATES } from './county-crimerates';

// prettier-ignore
const OSM_BASE_API = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=kreis&rows=403&fields=gen,bundesland,sdv_rs,bez,bundesland_code,geo_shape&';
const OSM_RADIUS_API = OSM_BASE_API + 'geofilter.distance=';
const OSM_POLYGON_API = OSM_BASE_API + 'geofilter.polygon=';
const OSM_LINE_API = OSM_BASE_API + 'geofilter.polygon=';

enum SearchTypes {
  Radius = 1,
  Line = 2,
  Polygon = 3,
}

export interface OsmResponse {
  records: { fields: OsmCounty }[];
}

@Injectable()
export class CountyService {
  constructor(private http: HttpClient) {}

  getCounties(cities: City[]): Observable<County[]> {
    return this.getOsmCounties(cities).pipe(
      map(osmCounties => {
        return osmCounties.map<County>(
          ({ bez, bundesland, bundesland_code, sdv_rs, gen, geo_shape }) => {
            const countyCode = bundesland_code.startsWith('1')
              ? sdv_rs.substr(0, 5)
              : sdv_rs.substr(0, 4);

            return {
              name: gen,
              type: bez,
              countyCode,
              state: bundesland,
              geometry: geo_shape,
              crimeRate: COUNTY_CRIME_RATES.get(countyCode),
            };
          },
        );
      }),
    );
  }

  private getOsmCounties(cities: City[]): Observable<OsmCounty[]> {
    const url = this.buildUrl(cities, cities.length);

    return this.http.get<OsmResponse>(url).pipe(map(({ records }) => records.map(r => r.fields)));
  }

  private buildUrl(cities: City[], type: SearchTypes): string {
    const { Line, Polygon, Radius } = SearchTypes;

    // prettier-ignore
    switch (type) {
      case Line:
        return `${OSM_LINE_API}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[1].lat},${cities[1].lng + 0.000001})`;
      case Polygon:
        return `${OSM_POLYGON_API}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[2].lat},${cities[2].lng})`;
      case Radius:
        return `${OSM_RADIUS_API}${cities[0].lat},${cities[0].lng},10000`;
    }
  }
}

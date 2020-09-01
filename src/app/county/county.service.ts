import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city/interfaces/city';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { County } from './interfaces/county';
import { OsmCounty } from './interfaces/osm-county';

// prettier-ignore
const OSM_BASE_API = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=landkreise-in-germany&q=&rows=403&facet=name_1&facet=name_2&facet=type_2&';
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
  constructor(
    private readonly http: HttpClient,
    @Inject('COUNTY_CRIME_RATES') private readonly countyCrimeRates: Map<number, number>,
  ) {}

  getCounties(cities: City[]): Observable<County[]> {
    return this.getOsmCounties(cities).pipe(
      switchMap(osmCounties => of(this.mapOsmCountiesToCounties(osmCounties))),
    );
  }

  private getOsmCounties(cities: City[]): Observable<OsmCounty[]> {
    const url = this.buildUrl(cities, cities.length);

    return this.http.get<OsmResponse>(url).pipe(map(({ records }) => records.map(r => r.fields)));
  }

  private mapOsmCountiesToCounties(osmCounties: OsmCounty[]): County[] {
    return osmCounties.map<County>(({ type_2, cca_2, name_2, name_1, geo_shape }) => ({
      name: name_2,
      type: type_2,
      state: name_1,
      countyCode: +cca_2,
      geometry: geo_shape,
      crimeRate: this.countyCrimeRates.get(+cca_2), // Get crime rate by county code.
    }));
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

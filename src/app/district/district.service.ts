import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city/interfaces/city';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { District } from './interfaces/district';
import { OsmDistrict } from './interfaces/osm-district';
import { environment } from '../../environments/environment';

enum SearchTypes {
  Radius = 1,
  Line = 2,
  Polygon = 3,
}

type OsmResponse = { records: { fields: OsmDistrict }[] };

const { Line, Polygon, Radius } = SearchTypes;
const { districtsByLine, districtsByPolygon, districtsByRadius } = environment.urls.openstreetmap;

@Injectable()
export class DistrictService {
  constructor(private http: HttpClient) {}

  getCounties(cities: City[]): Observable<District[]> {
    return this.getOsmDistricts(cities).pipe(
      switchMap(osmDistricts =>
        forkJoin(
          osmDistricts.map<Observable<District>>(({ krs_code, lan_name, geo_shape }) =>
            this.http
              .get<District>(environment.urls.countyById, { params: { code: krs_code } })
              .pipe(map(distrct => ({ ...distrct, geometry: geo_shape, stateName: lan_name }))),
          ),
        ),
      ),
    );
  }

  private getOsmDistricts(cities: City[]): Observable<OsmDistrict[]> {
    const url = this.buildUrl(cities, cities.length);

    return this.http.get<OsmResponse>(url).pipe(map(({ records }) => records.map(r => r.fields)));
  }

  private buildUrl(cities: City[], type: SearchTypes): string {
    // prettier-ignore
    switch (type) {
      case Line:
        return `${districtsByLine}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[1].lat},${cities[1].lng + 0.000001})`;
      case Polygon:
        return `${districtsByPolygon}(${cities[0].lat},${cities[0].lng}),(${cities[1].lat},${cities[1].lng}),(${cities[2].lat},${cities[2].lng})`;
      case Radius:
        return `${districtsByRadius}${cities[0].lat},${cities[0].lng},10000`;
    }
  }
}

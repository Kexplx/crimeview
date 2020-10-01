import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../city/interfaces/city';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { District } from './interfaces/district';
import { OpendatasoftDistrict } from './interfaces/opendatasoft-district';
import { environment } from '../../environments/environment';

enum SearchTypes {
  Radius = 1,
  Line = 2,
  Polygon = 3,
}

type OpendatasoftResponse = { records: { fields: OpendatasoftDistrict }[] };

const { Line, Polygon, Radius } = SearchTypes;
const { districtsByLine, districtsByPolygon, districtsByRadius } = environment.urls.opendatasoft;
const { getDistrictsById } = environment.urls.lambda;

@Injectable()
export class DistrictService {
  private districtCache: District[] = [];

  constructor(private http: HttpClient) {}

  getDistricts(cities: City[]): Observable<District[]> {
    return this.getOpendatasoftDistricts(cities).pipe(
      switchMap(opendatasoftDistricts =>
        forkJoin(
          opendatasoftDistricts.map<Observable<District>>(({ krs_code, geo_shape }) => {
            // Search cache for district and return if exists
            const cachedDistrict = this.districtCache.find(d => d.code === krs_code);
            if (cachedDistrict) {
              return of(cachedDistrict);
            }

            // If not cached, get district from aws api
            return this.http
              .get<District>(getDistrictsById, { params: { code: krs_code } })
              .pipe(
                // Add properties of current opendatasoft district
                map(distrct => ({ ...distrct, geometry: geo_shape })),

                // Push to cached districts
                tap((district: District) => this.districtCache.push(district)),
              );
          }),
        ),
      ),
    );
  }

  getDistrict(code: string): Observable<District | undefined> {
    return of(this.districtCache.find(d => d.code === code));
  }

  private getOpendatasoftDistricts(cities: City[]): Observable<OpendatasoftDistrict[]> {
    const url = this.buildUrl(cities, cities.length);

    return this.http
      .get<OpendatasoftResponse>(url)
      .pipe(map(({ records }) => records.map(r => r.fields)));
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

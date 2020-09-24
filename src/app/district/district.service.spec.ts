import { DistrictService, OsmResponse } from './district.service';
import { of } from 'rxjs';
import { OsmDistrict } from './interfaces/osm-district';
import { District } from './interfaces/district';
import { City } from '../city/interfaces/city';
import { COUNTY_CRIME_RATES } from './district-crimerates';

let service: DistrictService;
let dummyOsmDistrict: OsmDistrict;
let httpMock: { get: jest.Mock };

beforeEach(() => {
  dummyOsmDistrict = {
    krs_code: '01',
    geo_shape: {
      coordinates: [
        [
          [1, 2],
          [3, 4],
        ],
      ],
      type: 'Polygon',
    },
    lan_name: 'Bayern',
    krs_type: 'Kreisfreie Stadt',
    krs_name_short: 'Regensburg',
  };

  httpMock = {
    get: jest.fn(() => of<OsmResponse>({ records: [{ fields: dummyOsmDistrict }] })),
  };

  service = new DistrictService(httpMock as any);
});

describe('#getCounties', () => {
  let dummyCities: City[];

  beforeEach(() => {
    dummyCities = [
      { lat: 1, lng: 2 } as City,
      { lat: 1, lng: 2 } as City,
      { lat: 1, lng: 2 } as City,
    ];
  });

  it('should return the number of districts that osm returns', done => {
    service.getCounties(dummyCities.slice(0, 2)).subscribe(districts => {
      expect(districts).toHaveLength(1);
      done();
    });
  });

  it('should return an observable of districts when called with 1 city', done => {
    service.getCounties(dummyCities.slice(0, 1)).subscribe(districts => {
      checkEqualityOfOsmDistrictAndDistrict(districts[0], dummyOsmDistrict);
      done();
    });
  });

  it('should return an observable of districts when called with 2 cities', done => {
    service.getCounties(dummyCities.slice(0, 2)).subscribe(districts => {
      checkEqualityOfOsmDistrictAndDistrict(districts[0], dummyOsmDistrict);
      done();
    });
  });

  it('should return an observable of districts when called with 3 cities', done => {
    service.getCounties(dummyCities.slice(0, 3)).subscribe(districts => {
      checkEqualityOfOsmDistrictAndDistrict(districts[0], dummyOsmDistrict);
      done();
    });
  });
});

function checkEqualityOfOsmDistrictAndDistrict(
  { districtCode, crimeRate, type, state, geometry, name }: District,
  { krs_name_short, krs_type, krs_code, lan_name, geo_shape }: OsmDistrict,
): void {
  expect(name).toEqual(krs_name_short);
  expect(type).toEqual(krs_type);
  expect(state).toEqual(lan_name);
  expect(districtCode).toEqual(krs_code);
  expect(geometry).toEqual(geo_shape);
  expect(crimeRate).toEqual(COUNTY_CRIME_RATES.get(krs_code));
}

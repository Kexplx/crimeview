import { CountyService, OsmResponse } from './county.service';
import { of } from 'rxjs';
import { OsmCounty } from './interfaces/osm-county';
import { County } from './interfaces/county';
import { City } from '../city/interfaces/city';
import { COUNTY_CRIME_RATES } from './county-crimerates';

let service: CountyService;
let dummyOsmCounty: OsmCounty;
let httpMock: { get: jest.Mock };

beforeEach(() => {
  dummyOsmCounty = {
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
    get: jest.fn(() => of<OsmResponse>({ records: [{ fields: dummyOsmCounty }] })),
  };

  service = new CountyService(httpMock as any);
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

  it('should return the number of counties that osm returns', done => {
    service.getCounties(dummyCities.slice(0, 2)).subscribe(counties => {
      expect(counties).toHaveLength(1);
      done();
    });
  });

  it('should return an observable of counties when called with 1 city', done => {
    service.getCounties(dummyCities.slice(0, 1)).subscribe(counties => {
      checkEqualityOfOsmCountyAndCounty(counties[0], dummyOsmCounty);
      done();
    });
  });

  it('should return an observable of counties when called with 2 cities', done => {
    service.getCounties(dummyCities.slice(0, 2)).subscribe(counties => {
      checkEqualityOfOsmCountyAndCounty(counties[0], dummyOsmCounty);
      done();
    });
  });

  it('should return an observable of counties when called with 3 cities', done => {
    service.getCounties(dummyCities.slice(0, 3)).subscribe(counties => {
      checkEqualityOfOsmCountyAndCounty(counties[0], dummyOsmCounty);
      done();
    });
  });
});

function checkEqualityOfOsmCountyAndCounty(
  { countyCode, crimeRate, type, state, geometry, name }: County,
  { krs_name_short, krs_type, krs_code, lan_name, geo_shape }: OsmCounty,
): void {
  expect(name).toEqual(krs_name_short);
  expect(type).toEqual(krs_type);
  expect(state).toEqual(lan_name);
  expect(countyCode).toEqual(krs_code);
  expect(geometry).toEqual(geo_shape);
  expect(crimeRate).toEqual(COUNTY_CRIME_RATES.get(krs_code));
}

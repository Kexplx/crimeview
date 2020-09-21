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
    sdv_rs: '01',
    geo_shape: {
      coordinates: [
        [
          [1, 2],
          [3, 4],
        ],
      ],
      type: 'Polygon',
    },
    bundesland: 'Bayern',
    bundesland_code: '091823912',
    bez: 'Kreisfreihe Stadt',
    gen: 'Regensburg',
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

function checkEqualityOfOsmCountyAndCounty(county: County, osmCounty: OsmCounty): void {
  const osmCountyCode = osmCounty.bundesland_code.startsWith('1')
    ? osmCounty.sdv_rs.substr(0, 5)
    : osmCounty.sdv_rs.substr(0, 4);

  expect(county.name).toEqual(osmCounty.gen);
  expect(county.type).toEqual(osmCounty.bez);
  expect(county.state).toEqual(osmCounty.bundesland);
  expect(county.countyCode).toEqual(osmCountyCode);
  expect(county.geometry).toEqual(osmCounty.geo_shape);
  expect(county.crimeRate).toEqual(COUNTY_CRIME_RATES.get(osmCountyCode));
}

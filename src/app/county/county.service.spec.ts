import { CountyService, OsmResponse } from './county.service';
import { of } from 'rxjs';
import { OsmCounty } from './interfaces/osm-county';
import { County } from './interfaces/county';
import { City } from '../city/interfaces/city';

let httpMock: { get: jest.Mock };
let dummyCountyCrimeRates: Map<number, number>;
let dummyOsmCounty: OsmCounty;
let service: CountyService;

beforeEach(() => {
  dummyOsmCounty = {
    cca_2: '01',
    geo_shape: {
      coordinates: [
        [
          [1, 2],
          [3, 4],
        ],
      ],
      type: 'Polygon',
    },
    name_1: 'Bayern',
    type_2: 'Kreisfreihe Stadt',
    name_2: 'Regensburg',
  };

  httpMock = {
    get: jest.fn(_ => of<OsmResponse>({ records: [{ fields: dummyOsmCounty }] })),
  };
  dummyCountyCrimeRates = new Map<number, number>([[1, 0.0129]]);

  service = new CountyService(httpMock as any, dummyCountyCrimeRates);
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

  it('should return an observable of counties when called with 1 city', done => {
    service.getCounties(dummyCities.slice(0, 1)).subscribe(counties => {
      checkEqualityOfOsmCountyAndCounty(counties[0], dummyOsmCounty);
      done();
    });
  });

  it('should return the number of counties that osm returns', done => {
    service.getCounties(dummyCities.slice(0, 2)).subscribe(counties => {
      expect(counties).toHaveLength(1);
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
  expect(county.name).toEqual(osmCounty.name_2);
  expect(county.type).toEqual(osmCounty.type_2);
  expect(county.state).toEqual(osmCounty.name_1);
  expect(county.countyCode).toEqual(+osmCounty.cca_2);
  expect(county.geometry).toEqual(osmCounty.geo_shape);
  expect(county.crimeRate).toEqual(dummyCountyCrimeRates.get(county.countyCode));
}

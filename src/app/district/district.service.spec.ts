import { DistrictService } from './district.service';
import { of } from 'rxjs';
import { OpendatasoftDistrict } from './interfaces/opendatasoft-district';
import { District } from './interfaces/district';
import { City } from '../city/interfaces/city';

let service: DistrictService;
let httpMock: { get: jest.Mock };

const districtDummy: District = {
  code: '091',
  commonOffences: [{ offenceName: 'a', offencesCount: 1 }],
  crestUrl: 'ab',

  name: 'name',
  nonGermanSuspectsCount: 12,
  relativeOffencesCount: 34,
  solvedCasesCount: 56,
  totalOffencesCount: 1,
  totalSuspectsCount: 2,
  type: 'KfS',
};

const opendatasoftDistrictDummy: OpendatasoftDistrict = {
  geo_shape: {
    coordinates: [
      [
        [1, 2],
        [3, 4],
      ],
    ],
    type: 'Polygon',
  },
  krs_code: '09123',
  lan_name: 'Bayern',
};

function httpGetMockFn(url: string) {
  if (url.includes('aws')) {
    // Return District

    return of(districtDummy);
  } else if (url.includes('opendatasoft')) {
    // return opendatasoftDistricts

    return of({ records: [{ fields: opendatasoftDistrictDummy }] });
  }
}

beforeEach(() => {
  httpMock = {
    get: jest.fn(httpGetMockFn),
  };

  service = new DistrictService(httpMock as any);
});

describe('#getDistricts', () => {
  let dummyCities: City[];

  beforeEach(() => {
    dummyCities = [
      { lat: 1, lng: 2 } as City,
      { lat: 1, lng: 2 } as City,
      { lat: 1, lng: 2 } as City,
    ];
  });

  it('should return the number of districts that opendatasoft returns', done => {
    service.getDistricts(dummyCities.slice(0, 2)).subscribe(districts => {
      expect(districts).toHaveLength(1);
      done();
    });
  });

  it('should return an observable of districts when called with 1 city', done => {
    service.getDistricts(dummyCities.slice(0, 1)).subscribe(districts => {
      checkEqualityOfDistrictWithDummyDistrict(districts[0], districtDummy);
      checkEqualityOfDistrictWithOpendatasoftDistrict(districts[0], opendatasoftDistrictDummy);
      done();
    });
  });

  it('should return an observable of districts when called with 2 cities', done => {
    service.getDistricts(dummyCities.slice(0, 2)).subscribe(districts => {
      checkEqualityOfDistrictWithDummyDistrict(districts[0], districtDummy);
      checkEqualityOfDistrictWithOpendatasoftDistrict(districts[0], opendatasoftDistrictDummy);
      done();
    });
  });

  it('should return an observable of districts when called with 3 cities', done => {
    service.getDistricts(dummyCities.slice(0, 3)).subscribe(districts => {
      checkEqualityOfDistrictWithDummyDistrict(districts[0], districtDummy);
      checkEqualityOfDistrictWithOpendatasoftDistrict(districts[0], opendatasoftDistrictDummy);
      done();
    });
  });
});

function checkEqualityOfDistrictWithDummyDistrict(d1: District, d2: District): void {
  expect(d1.code).toEqual(d2.code);
  expect(d1.type).toEqual(d2.type);
  expect(d1.commonOffences).toEqual(d2.commonOffences);
  expect(d1.crestUrl).toEqual(d2.crestUrl);
  expect(d1.name).toEqual(d2.name);
  expect(d1.nonGermanSuspectsCount).toEqual(d2.nonGermanSuspectsCount);
  expect(d1.totalOffencesCount).toEqual(d2.totalOffencesCount);
  expect(d1.relativeOffencesCount).toEqual(d2.relativeOffencesCount);
  expect(d1.solvedCasesCount).toEqual(d2.solvedCasesCount);
  expect(d1.totalSuspectsCount).toEqual(d2.totalSuspectsCount);
}

function checkEqualityOfDistrictWithOpendatasoftDistrict(
  d: District,
  oD: OpendatasoftDistrict,
): void {
  expect(d.geometry).toEqual(oD.geo_shape);
  expect(d.stateName).toEqual(oD.lan_name);
}

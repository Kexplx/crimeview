import { Observable, of } from 'rxjs';
import { City } from '../city-search/interfaces/city';
import { DistrictService } from './district.service';
import { District } from './interfaces/district';
import { OpendatasoftDistrict } from './interfaces/opendatasoft-district';

let service: DistrictService;
let httpMock: { get: jest.Mock };

const districtDummy: District = {
  code: '091',
  commonOffences: [{ offenceName: 'a', offencesCount: 1 }],
  crestUrl: 'ab',
  name: 'name',
  nonGermanSuspectsCount: 12,
  relativeOffencesCount: 34,
  state: 'Bayern',
  solvedCasesCount: 56,
  totalOffencesCount: 1,
  totalSuspectsCount: 2,
  type: 'Kreisfreie Stadt',
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
};

function httpGetMockFn(url: string): Observable<any> {
  if (url.includes('aws')) {
    // Return District

    return of(districtDummy);
  } else {
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
      { name: 'Test City 1', position: { lat: 1, lng: 2 } } as City,
      { name: 'Test City 2', position: { lat: 1, lng: 2 } } as City,
      { name: 'Test City 3', position: { lat: 1, lng: 2 } } as City,
    ];
  });

  it('should return the number of districts that opendatasoft returns', done => {
    service.getDistricts(dummyCities.slice(0, 2)).subscribe(districts => {
      expect(districts).toHaveLength(1);

      done();
    });
  });

  it('should return an observable of districts when called with 1 city-search', done => {
    service.getDistricts(dummyCities.slice(0, 1)).subscribe(districts => {
      expect(districts).toMatchSnapshot();

      done();
    });
  });

  it('should return an observable of districts when called with 2 cities', done => {
    service.getDistricts(dummyCities.slice(0, 2)).subscribe(districts => {
      expect(districts).toMatchSnapshot();

      done();
    });
  });

  it('should return an observable of districts when called with 3 cities', done => {
    service.getDistricts(dummyCities.slice(0, 3)).subscribe(districts => {
      expect(districts).toMatchSnapshot();

      done();
    });
  });
});

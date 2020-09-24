import { District } from './district/interfaces/district';
import { DistrictService } from './district/district.service';
import { City } from './city/interfaces/city';
import { of } from 'rxjs';
import { Search, SearchService } from './search.service';

let searchService: SearchService;

let districtServiceSpy: { getCounties: jest.Mock };
let dummyCounties: District[];
let dummyCities: City[];

beforeEach(() => {
  dummyCounties = [{ name: 'Dummy1' } as District, { name: 'Dummy2' } as District];
  dummyCities = [{ name: 'Dummy3' } as City, { name: 'Dummy4' } as City];
  districtServiceSpy = { getCounties: jest.fn(() => of(dummyCounties)) };

  searchService = new SearchService((districtServiceSpy as unknown) as DistrictService);
});

describe('#handleSearchRequest', () => {
  it('should call #getCounties', () => {
    searchService.handleSearchRequest(dummyCities);
    expect(districtServiceSpy.getCounties).toHaveBeenCalled();
  });

  it('search$ should emit the new search', done => {
    searchService.search$.subscribe(search => {
      expect(search).toEqual<Search>({ districts: dummyCounties, cities: dummyCities, type: 'Line' });
      done();
    });

    searchService.handleSearchRequest(dummyCities);
  });
});

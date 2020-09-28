import { District } from './district/interfaces/district';
import { DistrictService } from './district/district.service';
import { City } from './city/interfaces/city';
import { of } from 'rxjs';
import { Search, SearchService } from './search.service';

let searchService: SearchService;

let districtServiceSpy: { getDistricts: jest.Mock };
let dummyDistricts: District[];
let dummyCities: City[];

beforeEach(() => {
  dummyDistricts = [{ name: 'Dummy1' } as District, { name: 'Dummy2' } as District];
  dummyCities = [{ name: 'Dummy3' } as City, { name: 'Dummy4' } as City];
  districtServiceSpy = { getDistricts: jest.fn(() => of(dummyDistricts)) };

  searchService = new SearchService((districtServiceSpy as unknown) as DistrictService);
});

describe('#handleSearchRequest', () => {
  it('should call #getDistricts', () => {
    searchService.handleSearchRequest(dummyCities);
    expect(districtServiceSpy.getDistricts).toHaveBeenCalled();
  });

  it('search$ should emit the new search', done => {
    searchService.search$.subscribe(search => {
      expect(search).toEqual<Search>({
        districts: dummyDistricts,
        cities: dummyCities,
        type: 'Line',
      });
      done();
    });

    searchService.handleSearchRequest(dummyCities);
  });
});

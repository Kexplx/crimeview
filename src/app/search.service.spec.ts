import { County } from './county/interfaces/county';
import { CountyService } from './county/county.service';
import { City } from './city/interfaces/city';
import { of } from 'rxjs';
import { Search, SearchService } from './search.service';

let searchService: SearchService;

let countyServiceSpy: { getCounties: jest.Mock };
let dummyCounties: County[];
let dummyCities: City[];

beforeEach(() => {
  dummyCounties = [{ name: 'Dummy1' } as County, { name: 'Dummy2' } as County];
  dummyCities = [{ name: 'Dummy3' } as City, { name: 'Dummy4' } as City];
  countyServiceSpy = { getCounties: jest.fn(() => of(dummyCounties)) };

  searchService = new SearchService((countyServiceSpy as unknown) as CountyService);
});

describe('#handleSearchRequest', () => {
  it('should call #getCounties', () => {
    searchService.handleSearchRequest(dummyCities);
    expect(countyServiceSpy.getCounties).toHaveBeenCalled();
  });

  it('search$ should emit the new search', done => {
    searchService.search$.subscribe(search => {
      expect(search).toEqual<Search>({ counties: dummyCounties, cities: dummyCities, type: 'Line' });
      done();
    });

    searchService.handleSearchRequest(dummyCities);
  });
});

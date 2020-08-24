import { Route, RouteService } from './route.service';
import { County } from './county/models/county';
import { CountyService } from './county/county.service';
import { City } from './city/models/city';
import { of } from 'rxjs';

let routeService: RouteService;

let countyServiceSpy: { getCounties: jest.Mock };
let dummyCounties: County[];
let dummyCities: City[];

beforeEach(() => {
  dummyCounties = [{ name: 'Dummy1' } as County, { name: 'Dummy2' } as County];
  dummyCities = [{ name: 'Dummy3' } as City, { name: 'Dummy4' } as City];
  countyServiceSpy = { getCounties: jest.fn(() => of(dummyCounties)) };

  routeService = new RouteService((countyServiceSpy as unknown) as CountyService);
});

describe('#handleSearchRequest', () => {
  it('should call #getCounties', () => {
    routeService.handleSearchRequest(dummyCities);
    expect(countyServiceSpy.getCounties).toHaveBeenCalled();
  });

  it('route$ should emit the new route', done => {
    routeService.route$.subscribe(route => {
      expect(route).toEqual<Route>({ counties: dummyCounties, cities: dummyCities, type: 'Line' });
      done();
    });

    routeService.handleSearchRequest(dummyCities);
  });
});

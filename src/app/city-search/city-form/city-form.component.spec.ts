import { MatSnackBar } from '@angular/material/snack-bar';
import { CitySearchService } from '../city-search.service';
import { City } from '../interfaces/city';
import { CityFormComponent } from './city-form.component';

let component: CityFormComponent;
let snackBarStub: { open: jest.Mock };
let searchServicestub: { handleSearchRequest: jest.Mock };

beforeEach(() => {
  snackBarStub = { open: jest.fn() };
  searchServicestub = { handleSearchRequest: jest.fn() };

  component = new CityFormComponent(
    (snackBarStub as unknown) as MatSnackBar,
    (searchServicestub as unknown) as CitySearchService,
  );
});

describe('#onCitySelect', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;

  beforeEach(() => {
    component.cities = [];
  });

  it('should call #open if max. capacity is reached', () => {
    component.cities = [{ ...dummyCity }, { ...dummyCity }, { ...dummyCity }];
    component.onCitySelect(dummyCity);

    expect(snackBarStub.open.mock.calls.length).toEqual(1);
  });

  it('should call #open if city-search already exists', () => {
    component.cities = [dummyCity];
    component.onCitySelect(dummyCity);

    expect(snackBarStub.open.mock.calls.length).toEqual(1);
  });

  it('should add the city-search to #cities', () => {
    component.onCitySelect(dummyCity);
    expect(component.cities.length).toEqual(1);
    expect(component.cities[0]).toEqual(dummyCity);
  });
});

describe('#onCityRemove', () => {
  it('should remove the city from #cities', () => {
    const dummyCity: City = {} as City;
    component.cities = [dummyCity];

    component.onCityRemove(dummyCity);

    expect(component.cities).toHaveLength(0);
  });
});

describe('#onSearch', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;
  it('should call #handleSearchRequest once', () => {
    component.onSubmit();

    expect(searchServicestub.handleSearchRequest.mock.calls).toHaveLength(1);
  });

  it('should call #handleSearchRequest with cities ', () => {
    component.cities = [{ ...dummyCity }, { ...dummyCity }];
    component.onSubmit();

    expect(searchServicestub.handleSearchRequest).toHaveBeenCalledWith(component.cities);
  });
});

import { CityFormComponent } from './city-form.component';
import { City } from '../interfaces/city';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitySearchService } from '../city-search.service';

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
    component.checkedCities = [];
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

  it('should add the city-search to #checkedCities', () => {
    component.onCitySelect(dummyCity);
    expect(component.checkedCities.length).toEqual(1);
    expect(component.checkedCities[0]).toEqual(dummyCity);
  });
});

describe('#onDelete', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;

  it('should remove all items from #cities', () => {
    component.cities = [dummyCity];
    component.onDelete();
    expect(component.cities).toHaveLength(0);
  });

  it('should remove all items from #checkedCities', () => {
    component.checkedCities = [dummyCity];
    component.onDelete();
    expect(component.checkedCities).toHaveLength(0);
  });
});

describe('#onCheck', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;

  beforeEach(() => {
    component.cities = [];
    component.checkedCities = [];
  });
  it('should add the city-search to #checkedCities when #checked is true', () => {
    component.onCheck(dummyCity, true);
    expect(component.checkedCities).toEqual([dummyCity]);
  });

  it('should remove the city-search from #checkedCities when #checked is false', () => {
    component.checkedCities = [dummyCity];
    component.onCheck(dummyCity, false);
    expect(component.checkedCities).toHaveLength(0);
  });
});

describe('#onSearch', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;
  it('should call #handleSearchRequest once', () => {
    component.onSubmit();

    expect(searchServicestub.handleSearchRequest.mock.calls).toHaveLength(1);
  });

  it('should call #handleSearchRequest with checkedCities ', () => {
    component.checkedCities = [{ ...dummyCity }, { ...dummyCity }];
    component.onSubmit();

    expect(searchServicestub.handleSearchRequest).toHaveBeenCalledWith(component.checkedCities);
  });
});

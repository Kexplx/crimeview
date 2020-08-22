import { CityListComponent } from './city-list.component';
import { City } from '../models/city';
import { MatSnackBar } from '@angular/material/snack-bar';

let component: CityListComponent;
let snackBarStub: { open: jest.Mock };

beforeEach(() => {
  snackBarStub = {
    open: jest.fn(),
  };

  component = new CityListComponent((snackBarStub as unknown) as MatSnackBar);
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

  it('should call #open if city already exists', () => {
    component.cities = [dummyCity];
    component.onCitySelect(dummyCity);

    expect(snackBarStub.open.mock.calls.length).toEqual(1);
  });

  it('should add the city to #cities', () => {
    component.onCitySelect(dummyCity);
    expect(component.cities.length).toEqual(1);
    expect(component.cities[0]).toEqual(dummyCity);
  });

  it('should add the city to #checkedCities', () => {
    component.onCitySelect(dummyCity);
    expect(component.checkedCities.length).toEqual(1);
    expect(component.checkedCities[0]).toEqual(dummyCity);
  });
});

describe('#isChecked', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;

  beforeEach(() => {
    component.cities = [];
    component.checkedCities = [];
  });

  it('should return true if #checkedCities contains city', () => {
    component.checkedCities = [dummyCity];
    const result = component.isChecked(dummyCity);

    expect(result).toEqual(true);
  });

  // tslint:disable-next-line: quotemark
  it("should return false if #checkedCities doesn't contain city", () => {
    component.checkedCities = [];
    const result = component.isChecked(dummyCity);

    expect(result).toEqual(false);
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
  it('should add the city to #checkedCities when #checked is true', () => {
    component.onCheck(dummyCity, true);
    expect(component.checkedCities).toEqual([dummyCity]);
  });

  it('should remove the city from #checkedCities when #checked is false', () => {
    component.checkedCities = [dummyCity];
    component.onCheck(dummyCity, false);
    expect(component.checkedCities).toHaveLength(0);
  });
});

describe('#onStart', () => {
  const dummyCity: City = { name: 'Regensburg', placeId: '01921' } as City;
  it('should emit #checkedCities', done => {
    component.checkedCities = [{ ...dummyCity }, { ...dummyCity }];
    component.searchStarted.subscribe((cities: City) => {
      expect(component.checkedCities).toEqual(cities);

      done();
    });

    component.onStart();
  });
});

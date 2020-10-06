import { City } from '../interfaces/city';
import { IsCheckedPipe } from './is-checked.pipe';

const pipe = new IsCheckedPipe();

it('should return true if city-search exists in array', () => {
  const city: City = {} as City;
  const cities = [city];

  const result = pipe.transform(city, cities);
  expect(result).toEqual(true);
});

// tslint:disable-next-line: quotemark
it("should return false if city-search doesn't in array", () => {
  const result = pipe.transform({} as City, []);
  expect(result).toEqual(false);
});

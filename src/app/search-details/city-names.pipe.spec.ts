import { CityNamesPipe } from './city-names.pipe';
import { City } from '../city-search/interfaces/city';

const pipe = new CityNamesPipe();

it('should concat city-search names with "-" for type "Line"', () => {
  const cities: City[] = [{ name: 'Regensburg' } as City, { name: 'Muenchen' } as City];

  const result = pipe.transform(cities, 'Line');
  expect(result).toEqual('Regensburg - Muenchen');
});

it('should concat city-search names with "-" for type "Polygon"', () => {
  const cities: City[] = [
    { name: 'Regensburg' } as City,
    { name: 'Muenchen' } as City,
    { name: 'Dortmund' } as City,
  ];

  const result = pipe.transform(cities, 'Polygon');
  expect(result).toEqual('Regensburg - Muenchen - Dortmund');
});

it('should postfix first city-search name with "(10km Radius)" for type "Line"', () => {
  const cities: City[] = [{ name: 'Regensburg' } as City];

  const result = pipe.transform(cities, 'Radius');
  expect(result).toEqual('Regensburg (10km Radius)');
});

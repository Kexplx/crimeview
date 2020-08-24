import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../city/models/city';

@Pipe({
  name: 'cityNames',
})
export class CityNamesPipe implements PipeTransform {
  transform(cities: City[], type: 'Radius' | 'Line' | 'Polygon'): string {
    if (type === 'Radius') {
      return cities[0].name + ' (10km Radius)';
    }

    return cities.map<string>(c => c.name).join(' - ');
  }
}

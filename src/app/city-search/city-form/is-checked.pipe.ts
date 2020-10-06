import { Pipe, PipeTransform } from '@angular/core';
import { City } from '../interfaces/city';

@Pipe({
  name: 'isChecked',
})
export class IsCheckedPipe implements PipeTransform {
  transform(city: City, cities: City[]): boolean {
    return cities.some(c => c === city);
  }
}

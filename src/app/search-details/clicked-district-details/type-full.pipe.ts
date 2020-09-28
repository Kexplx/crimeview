import { Pipe, PipeTransform } from '@angular/core';
import { DistrictType } from 'src/app/district/interfaces/district';

@Pipe({
  name: 'typeFull',
})
export class TypeFullPipe implements PipeTransform {
  private map: Map<DistrictType, string> = new Map([
    ['K', 'Kreis'],
    ['KfS', 'Kreisfreie Stadt'],
    ['LK', 'Landkreis'],
    ['RV', 'Regionalverbund'],
    ['SK', 'Stadtkreis'],
  ]);

  transform(type: DistrictType): string | undefined {
    return this.map.get(type);
  }
}

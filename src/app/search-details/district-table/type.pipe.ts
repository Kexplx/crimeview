import { Pipe, PipeTransform } from '@angular/core';
import { DistrictType } from '../../district/interfaces/district';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  private typeAbbreviations = new Map<string, string>([
    ['Landkreis', 'LK'],
    ['Kreis', 'K'],
    ['Kreisfreie Stadt', 'KfS'],
  ]);

  transform(type: DistrictType): string {
    const abbr = this.typeAbbreviations.get(type);

    return abbr ?? type;
  }
}

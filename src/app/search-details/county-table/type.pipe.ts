import { Pipe, PipeTransform } from '@angular/core';
import { CountyType } from 'src/app/county/interfaces/county';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  private typeAbbreviations = new Map<string, string>([
    ['Landkreis', 'LK'],
    ['Kreis', 'K'],
    ['Kreisfreie Stadt', 'KfS'],
  ]);

  transform(type: CountyType): string {
    const abbr = this.typeAbbreviations.get(type);

    return abbr ?? type;
  }
}

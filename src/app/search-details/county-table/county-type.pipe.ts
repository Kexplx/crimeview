import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countyType',
})
export class CountyTypePipe implements PipeTransform {
  transform(type: 'Landkreis' | 'Kreisfreihe Stadt'): string {
    return type === 'Landkreis' ? 'LK' : 'KFS';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countyType',
})
export class CountyTypePipe implements PipeTransform {
  transform(type: 'Landkreis' | 'Kreisfreihe Stadt'): 'LK' | 'KFS' {
    return type === 'Landkreis' ? 'LK' : 'KFS';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type',
})
export class TypePipe implements PipeTransform {
  transform(type: 'Landkreis' | 'Kreisfreihe Stadt'): 'LK' | 'KFS' {
    return type === 'Landkreis' ? 'LK' : 'KFS';
  }
}

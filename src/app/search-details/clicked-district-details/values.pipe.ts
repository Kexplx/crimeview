import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
  transform(value: { offenceName: string; offencesCount: number }[]): unknown {
    return value.map<{ name: string; value: number }>(co => ({
      name: co.offenceName,
      value: co.offencesCount,
    }));
  }
}

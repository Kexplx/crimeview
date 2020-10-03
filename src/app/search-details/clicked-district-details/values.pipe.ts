import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
  transform(
    commonOffences: { offenceName: string; offencesCount: number }[],
  ): { name: string; value: number }[] {
    return commonOffences.map<{ name: string; value: number }>(
      ({ offenceName: name, offencesCount: value }) => ({
        name,
        value,
      }),
    );
  }
}

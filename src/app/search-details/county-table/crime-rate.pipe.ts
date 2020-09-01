import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crimeRate',
})
export class CrimeRatePipe implements PipeTransform {
  transform(crimeRate: number): number {
    return Math.floor(crimeRate * 100000);
  }
}

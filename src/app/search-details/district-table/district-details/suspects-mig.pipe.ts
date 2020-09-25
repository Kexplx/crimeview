import { Pipe, PipeTransform } from '@angular/core';
import { District } from 'src/app/district/interfaces/district';

@Pipe({
  name: 'suspectsMig',
})
export class SuspectsMigPipe implements PipeTransform {
  transform({ nonGermanSuspectsCount, totalSuspectsCount }: District): string {
    return `${nonGermanSuspectsCount} (${Math.floor(
      (nonGermanSuspectsCount / totalSuspectsCount) * 100,
    )}%)`;
  }
}

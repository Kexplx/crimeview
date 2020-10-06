import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prediction',
})
export class PredictionPipe implements PipeTransform {
  transform(name: string): string {
    return name.replace(/, Deutschland/, '');
  }
}

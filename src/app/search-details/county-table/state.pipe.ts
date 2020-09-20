import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state',
})
export class StatePipe implements PipeTransform {
  private stateAbbreviations = new Map<string, string>([
    ['Brandenburg', 'BB'],
    ['Berlin', 'BE'],
    ['Baden-Württemberg', 'BW'],
    ['Bayern', 'BY'],
    ['Bremen', 'HB'],
    ['Hessen', 'HE'],
    ['Hamburg', 'HH'],
    ['Mecklenburg-Vorpommern', 'MV'],
    ['Niedersachsen', 'NI'],
    ['Nordrhein-Westfalen', 'NW'],
    ['Rheinland-Pfalz', 'RP'],
    ['Schleswig-Holstein', 'SH'],
    ['Saarland', 'SL'],
    ['Sachsen', 'SN'],
    ['Sachsen-Anhalt', 'ST'],
    ['Thüringen', 'TH'],
  ]);

  transform(state: string): string {
    const abbr = this.stateAbbreviations.get(state);

    return abbr ?? state;
  }
}

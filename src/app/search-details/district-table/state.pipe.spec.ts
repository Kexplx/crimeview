import { StatePipe } from './state.pipe';

const abbr = new Map<string, string>([
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

const pipe = new StatePipe();

it('should return the abbreviation for the state name', () => {
  for (const [k, v] of abbr) {
    const result = pipe.transform(k);
    expect(result).toEqual(v);
  }
});

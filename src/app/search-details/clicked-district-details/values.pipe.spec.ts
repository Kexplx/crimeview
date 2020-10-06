import { ValuesPipe } from './values.pipe';

const pipe = new ValuesPipe();

const commonOffences: { offenceName: string; offencesCount: number }[] = [
  { offenceName: 'Offence', offencesCount: 281 },
];

describe('#transform', () => {
  it('maps commonOffences to { name: string; value: number }[]', () => {
    const result = pipe.transform(commonOffences);

    expect(result.length).toEqual(commonOffences.length);

    for (let i = 0; i < result.length; i++) {
      expect(result[i].name).toEqual(commonOffences[i].offenceName);
      expect(result[i].value).toEqual(commonOffences[i].offencesCount);
    }
  });
});

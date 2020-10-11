import { ValuesPipe } from './values.pipe';

const pipe = new ValuesPipe();

const commonOffences: { offenceName: string; offencesCount: number }[] = [
  { offenceName: 'Offence name', offencesCount: 281 },
];

describe('#transform', () => {
  it('maps commonOffences to { name: string; value: number }[]', () => {
    const result = pipe.transform(commonOffences);

    expect(result).toMatchSnapshot();
  });
});

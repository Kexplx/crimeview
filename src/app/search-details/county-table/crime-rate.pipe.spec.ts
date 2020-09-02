import { CrimeRatePipe } from './crime-rate.pipe';

const crimeRatePipe = new CrimeRatePipe();

describe('#transform', () => {
  it('should return the given input multiplied by 100k', () => {
    const input = 0.09102;
    const result = crimeRatePipe.transform(input);
    expect(result).toEqual(Math.floor(input * 100000));
  });
});

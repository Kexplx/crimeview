import { District } from 'src/app/district/interfaces/district';
import { SuspectsMigPipe } from '../clicked-district-details/suspects-mig.pipe';

const pipe = new SuspectsMigPipe();

describe('#transform', () => {
  it('should format nonGermanSuspects', () => {
    const district: District = {
      nonGermanSuspectsCount: 10,
      totalSuspectsCount: 100,
    } as District;

    const actual = pipe.transform(district);

    expect(actual).toMatchSnapshot();
  });
});

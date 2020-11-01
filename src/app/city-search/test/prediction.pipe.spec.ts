import { PredictionPipe } from '../city-input/prediction.pipe';

const pipe = new PredictionPipe();

it('removes ", Deutschland" postfix', () => {
  const prediction = 'Regensburg, Deutschland';
  const result = pipe.transform(prediction);
  expect(result).toEqual('Regensburg');
});

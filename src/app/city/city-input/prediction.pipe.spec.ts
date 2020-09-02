import { PredictionPipe } from './prediction.pipe';
const pipe = new PredictionPipe();

it('removes ", Deutschland" prefix', () => {
  const prediction = 'Regensburg, Deutschland';
  const result = pipe.transform(prediction);
  expect(result).toEqual('Regensburg');
});

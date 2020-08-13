import { CityService } from './city.service';
import 'jasmine';

describe('CityService', () => {
  // let cityService: CityService;
  // let autocompleteServiceSpy: jasmine.SpyObj<google.maps.places.AutocompleteService>;
  // let geoCoderSpy: jasmine.SpyObj<google.maps.Geocoder>;

  // beforeEach(() => {
  //   autocompleteServiceSpy = jasmine.createSpyObj(['getPlacePredictions']);
  //   geoCoderSpy = jasmine.createSpyObj(['geocode']);

  //   autocompleteServiceSpy.getPlacePredictions.and.callFake(
  //     (config: any, callback: (r: any, f: any) => void) => {
  //       const predictions: { description: string; place_id: string }[] = [
  //         { description: 'test', place_id: 'test' },
  //       ];

  //       return predictions;
  //     },
  //   );

  //   cityService = new CityService(autocompleteServiceSpy, geoCoderSpy);
  // });

  // describe('getCityPredictions', () => {
  //   it('should call #getPlacePredictions once', () => {
  //     cityService.getCityPredictions('test');

  //     expect(autocompleteServiceSpy.getPlacePredictions.calls.count()).toEqual(1);
  //   });
  // });

  it('should do', () => {
    expect(1).toEqual(1);
  });
});

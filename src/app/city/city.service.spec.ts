import { CityService } from './city.service';
import { of } from 'rxjs';
import { City } from './interfaces/city';

type AutocompleteService = google.maps.places.AutocompleteService;
type Geocoder = google.maps.Geocoder;

let cityService: CityService;
let geocoderSpy: { geocode: jest.Mock };
let predictionServiceSpy: { getPlacePredictions: jest.Mock };

beforeEach(() => {
  predictionServiceSpy = {
    getPlacePredictions: jest
      .fn()
      .mockReturnValue(of([{ description: 't_desc', place_id: 't_placeId' }])),
  };

  geocoderSpy = {
    geocode: jest.fn().mockReturnValueOnce(
      of<City>({
        lat: 0,
        lng: 1,
        name: 't_city',
        placeId: 't_placeId',
      }),
    ),
  };

  cityService = new CityService(
    (predictionServiceSpy as unknown) as AutocompleteService,
    (geocoderSpy as unknown) as Geocoder,
  );
});

describe('#getCityPredictions', () => {
  it('calls #getPlacePredictions once', () => {
    cityService.getCityPredictions('').subscribe(() => {
      expect(predictionServiceSpy.getPlacePredictions.mock.calls.length).toEqual(1);
    });
  });

  it('returns observable with mapped predictions', () => {
    cityService.getCityPredictions('').subscribe(predictions => {
      expect(predictions).toEqual([{ name: 't_desc', placeId: 't_placeId' }]);
    });
  });
});

describe('#getCity', () => {
  it('should return an observable of cities', () => {
    cityService.getCity('abc').subscribe(cities => {
      expect(cities).toEqual({
        lat: 0,
        lng: 1,
        name: 't_city',
        placeId: 't_placeId',
      });
    });
  });
});

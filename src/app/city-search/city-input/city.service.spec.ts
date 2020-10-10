import { NgZone } from '@angular/core';
import { CityService } from './city.service';

type AutocompleteService = google.maps.places.AutocompleteService;
type Geocoder = google.maps.Geocoder;

const ngZoneStub = {
  run: (cb: () => void) => cb(),
};

const predictionServiceSpy = {
  getPlacePredictions: jest.fn((_: any, cb: any) =>
    cb([{ description: 't_desc', place_id: 't_placeId' }]),
  ),
};

const geocoderSpy = {
  geocode: jest.fn((_: any, cb: any) =>
    cb([
      {
        address_components: [{ long_name: 'cityName' }],
        geometry: { location: { lat: () => 1, lng: () => 0 } },
      },
    ]),
  ),
};

const cityService = new CityService(
  (predictionServiceSpy as unknown) as AutocompleteService,
  (geocoderSpy as unknown) as Geocoder,
  (ngZoneStub as unknown) as NgZone,
);

describe('#getCityPredictions', () => {
  it('calls #getPlacePredictions once', done => {
    cityService.getCityPredictions('').subscribe(() => {
      expect(predictionServiceSpy.getPlacePredictions.mock.calls.length).toEqual(1);

      done();
    });
  });

  it('returns observable with mapped predictions', done => {
    cityService.getCityPredictions('').subscribe(predictions => {
      expect(predictions).toEqual([{ name: 't_desc', placeId: 't_placeId' }]);

      done();
    });
  });
});

describe('#getCity', () => {
  it('should return an observable of cities', done => {
    cityService.getCity('placeId').subscribe(city => {
      expect(city).toEqual({ placeId: 'placeId', name: 'cityName', position: { lat: 1, lng: 0 } });

      done();
    });
  });
});

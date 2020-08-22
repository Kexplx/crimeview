import { CityInputComponent } from './city-input.component';
import { CityPrediction } from '../models/city-prediction';
import { of } from 'rxjs';
import { City } from '../models/city';
import { CityService } from '../city.service';
import { NgZone } from '@angular/core';

let cityServiceSpy: { getCityPredictions: jest.Mock; getCity: jest.Mock };
const cityPredictions: CityPrediction[] = [
  { name: 'A', placeId: 'B' },
  { name: 'c', placeId: 'D' },
];

const city: City = { placeId: '123', name: 'K', lat: 1, lng: 2 };

let component: CityInputComponent;

beforeEach(() => {
  const ngZoneStub = { run: (cb: () => void) => cb() };
  cityServiceSpy = {
    getCity: jest.fn(() => of(city)),
    getCityPredictions: jest.fn(() => of(cityPredictions)),
  };

  component = new CityInputComponent(
    (cityServiceSpy as unknown) as CityService,
    (ngZoneStub as unknown) as NgZone,
  );
});

describe('#onInput', () => {
  it('should trigger a value emitted by #predictions', done => {
    component.predictions$.subscribe(cp => {
      expect(cp).toEqual(cityPredictions);
      done();
    });

    component.onInput('input');
  });
});

describe('#onPredictionSelected', () => {
  it('should call #getCity', () => {
    component.onPredictionSelected({ name: 'c', placeId: 'D' });
    expect(cityServiceSpy.getCity.mock.calls).toHaveLength(1);
  });

  it('should emit the returned city', done => {
    component.citySelected.subscribe((c: City) => {
      expect(c).toEqual(city);
      done();
    });

    component.onPredictionSelected({ placeId: '123' } as City);
  });
});

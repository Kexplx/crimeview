import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CityPrediction {
  placeId: string;
  name: string;
}

export interface City {
  placeId: string;
  name: string;
  state: string;
  state_short: string;
  lat: number;
  lng: number;
}

@Injectable()
export class CityService {
  constructor(
    private predictionsService: google.maps.places.AutocompleteService,
    private geoCoder: google.maps.Geocoder,
  ) {}

  private predictionsOptions = {
    componentRestrictions: { country: 'de' },
    types: ['(cities)'],
  };

  getCityPredictions(input: string): Observable<CityPrediction[]> {
    return new Observable(sub => {
      this.predictionsService.getPlacePredictions(
        { ...this.predictionsOptions, input },
        predictions => {
          const cityPredictions = predictions.map<CityPrediction>(p => ({
            name: p.description,
            placeId: p.place_id,
          }));

          sub.next(cityPredictions);
        },
      );
    });
  }

  getCity(placeId: string): Observable<City> {
    return new Observable(sub => {
      this.geoCoder.geocode({ placeId }, result => {
        const { address_components, geometry } = result[0];

        const city: City = {
          placeId,
          lat: geometry.location.lat(),
          lng: geometry.location.lng(),
          name: address_components[0].long_name,
          state: address_components[3].long_name,
          state_short: address_components[3].short_name,
        };

        sub.next(city);
      });
    });
  }
}

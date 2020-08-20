import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityPrediction } from './models/city-prediction';
import { City } from './models/city';

type AutocompletionRequest = google.maps.places.AutocompletionRequest;
type AutocompleteService = google.maps.places.AutocompleteService;
type Geocoder = google.maps.Geocoder;

@Injectable()
export class CityService {
  constructor(
    private readonly predictionsService: AutocompleteService,
    private readonly geoCoder: Geocoder,
  ) {}

  private predictionsOptions: Readonly<Partial<AutocompletionRequest>> = {
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
        };

        sub.next(city);
      });
    });
  }
}

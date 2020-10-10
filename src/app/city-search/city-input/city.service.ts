import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city';
import { CityPrediction } from '../interfaces/city-prediction';

type AutocompletionRequest = google.maps.places.AutocompletionRequest;

@Injectable()
export class CityService {
  constructor(
    private predictionsService: google.maps.places.AutocompleteService,
    private geoCoder: google.maps.Geocoder,
    private ngZone: NgZone,
  ) {}

  private predictionsOptions: Partial<AutocompletionRequest> = {
    componentRestrictions: { country: 'de' },
    types: ['(cities)'],
  };

  getCityPredictions(input: string): Observable<CityPrediction[]> {
    return new Observable(sub => {
      this.predictionsService.getPlacePredictions(
        { ...this.predictionsOptions, input },
        predictions =>
          this.ngZone.run(() => {
            const cityPredictions = predictions.map<CityPrediction>(p => ({
              name: p.description,
              placeId: p.place_id,
            }));

            sub.next(cityPredictions);
          }),
      );
    });
  }

  getCity(placeId: string): Observable<City> {
    return new Observable(sub => {
      this.geoCoder.geocode({ placeId }, result =>
        this.ngZone.run(() => {
          const {
            address_components,
            geometry: {
              location: { lat, lng },
            },
          } = result[0];

          const city: City = {
            placeId,
            name: address_components[0].long_name,
            position: { lat: lat(), lng: lng() },
          };

          sub.next(city);
        }),
      );
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface CityPrediction {
  name: string;
  placeId: string;
}

@Injectable()
export class CityService {
  constructor(
    private predictionsService: google.maps.places.AutocompleteService,
    private geocoder: google.maps.Geocoder,
  ) {}

  private getPredictionsOptions = {
    componentRestrictions: { country: 'de' },
    types: ['(cities)'],
  };

  getCityPredictions(input: string): Observable<CityPrediction[]> {
    const cityPredictions$ = new Subject<CityPrediction[]>();

    this.predictionsService.getPlacePredictions(
      { ...this.getPredictionsOptions, input },
      predictions => {
        const mappedPredictions = predictions.map<CityPrediction>(p => ({
          name: p.description,
          placeId: p.place_id,
        }));

        cityPredictions$.next(mappedPredictions);
      },
    );

    return cityPredictions$.asObservable();
  }
}

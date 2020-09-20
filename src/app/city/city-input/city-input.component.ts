import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { CityService } from '../city.service';
import { City } from '../interfaces/city';
import { CityPrediction } from '../interfaces/city-prediction';

const DEBOUNCE_MS = 200;

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class CityInputComponent {
  @Output() citySelected = new EventEmitter<City>();

  private inputSubject = new Subject<string>();

  predictions$: Observable<CityPrediction[]> = this.inputSubject.pipe(
    debounceTime(DEBOUNCE_MS),
    distinctUntilChanged(),
    switchMap(input => this.cityService.getCityPredictions(input)),
  );

  constructor(private cityService: CityService, private ngZone: NgZone) {}

  onInput(input: string | undefined): void {
    if (input) {
      this.inputSubject.next(input);
    }
  }

  onPredictionSelected({ placeId }: CityPrediction): void {
    this.cityService
      .getCity(placeId)
      .subscribe(city => this.ngZone.run(() => this.citySelected.emit(city)));
  }

  displayFn({ name }: CityPrediction): string {
    return name;
  }
}

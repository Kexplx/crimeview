import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CityService, CityPrediction } from '../../city.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
})
export class CityInputComponent implements OnInit {
  predictions$: Observable<CityPrediction[]>;

  private input$ = new Subject<string>();

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.predictions$ = this.input$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(input => this.cityService.getCityPredictions(input)),
    );
  }

  onInput(input: string): void {
    this.input$.next(input);
  }

  onPredictionSelected(prediction: CityPrediction): void {
    // emit
  }

  displayFn(prediction: CityPrediction): string {
    return prediction.name;
  }
}

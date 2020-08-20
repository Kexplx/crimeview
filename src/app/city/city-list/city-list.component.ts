import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from '../models/city';

const CAPACITY = 3;
const NO_CAPACITY_MESSAGE = 'Maximale Anzahl an Städten erreicht';
const NOT_DISTINCT_MESSAGE = ' wurde bereits hinzugefügt';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  @Output() searchStarted = new EventEmitter<Readonly<City[]>>();
  cities: Readonly<City[]> = [];
  checkedCities: Readonly<City[]> = [];

  constructor(private snackBarService: MatSnackBar) {}

  onCitySelect(city: City): void {
    const noCapacity = this.cities.length === CAPACITY;

    if (noCapacity) {
      this.snackBarService.open(NO_CAPACITY_MESSAGE, 'Weiter');
      return;
    }

    const isDistinct = !this.cities.some(c => c.placeId === city.placeId);

    if (isDistinct) {
      this.cities = [...this.cities, city];
      this.checkedCities = [...this.checkedCities, city];
    } else {
      this.snackBarService.open(city.name + NOT_DISTINCT_MESSAGE, 'Weiter');
    }
  }

  isChecked(city: City): boolean {
    return this.checkedCities.some(cc => cc === city);
  }

  onDelete(): void {
    this.cities = [];
    this.checkedCities = [];
  }

  onCheck(city: City, checked: boolean): void {
    if (checked) {
      this.checkedCities = [...this.checkedCities, city];
    } else {
      const indexOfCity = this.checkedCities.indexOf(city);

      this.checkedCities = [
        ...this.checkedCities.slice(0, indexOfCity),
        ...this.checkedCities.slice(indexOfCity + 1),
      ];
    }
  }

  onStart(): void {
    this.searchStarted.emit(this.checkedCities);
  }
}

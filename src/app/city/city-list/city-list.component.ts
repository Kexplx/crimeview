import { Component } from '@angular/core';
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
  cities: City[] = [];

  constructor(private snackBarService: MatSnackBar) {}

  onCitySelect(city: City): void {
    const noCapacity = this.cities.length === CAPACITY;

    if (noCapacity) {
      this.snackBarService.open(NO_CAPACITY_MESSAGE);
      return;
    }

    const isDistinct = !this.cities.find(c => c.placeId === city.placeId);

    if (isDistinct) {
      this.cities.push(city);
    } else {
      this.snackBarService.open(city.name + NOT_DISTINCT_MESSAGE);
    }
  }

  onStart(): void {
    // Start
  }

  onDelete(): void {
    this.cities = [];
  }
}

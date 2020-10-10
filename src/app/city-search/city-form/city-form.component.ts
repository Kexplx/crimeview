import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitySearchService } from '../city-search.service';
import { City } from '../interfaces/city';

const CAPACITY = 3;
const NO_CAPACITY_MESSAGE = 'Maximale Anzahl an Städten erreicht';
const NOT_DISTINCT_MESSAGE = ' ist bereits im Suchraum';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss'],
})
export class CityFormComponent {
  cities: City[] = [];
  showProgressBar$ = this.searchService.isSearching$;

  constructor(private snackBarService: MatSnackBar, private searchService: CitySearchService) {}

  onCitySelect(city: City): void {
    const noCapacity = this.cities.length === CAPACITY;

    if (noCapacity) {
      this.snackBarService.open(NO_CAPACITY_MESSAGE, 'Weiter');
      return;
    }

    const isDistinct = !this.cities.some(c => c.placeId === city.placeId);

    if (isDistinct) {
      this.cities.push(city);
    } else {
      this.snackBarService.open(city.name + NOT_DISTINCT_MESSAGE, 'Weiter');
    }
  }

  onCityRemove(city: City): void {
    const indexOf = this.cities.indexOf(city);

    if (indexOf !== -1) {
      this.cities.splice(indexOf, 1);
    }
  }

  onSubmit(): void {
    this.searchService.handleSearchRequest(this.cities);
  }

  @HostListener('window:keydown.control.enter') onCtrlEnterDown(): void {
    if (this.cities.length) {
      this.onSubmit();
    }
  }
}

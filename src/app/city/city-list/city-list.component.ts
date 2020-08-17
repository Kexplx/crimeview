import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { City } from '../city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent {
  cities: City[] = [];

  onCitySelect(city: City): void {
    const isDistinct = !this.cities.find(c => c.placeId === city.placeId);

    if (isDistinct) {
      this.cities.push(city);
    }
  }
}

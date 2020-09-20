import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { MapboxMap } from './mapbox-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      .map {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private searchSubscription = this.searchService.search$.subscribe(({ counties }) => {
    this.map.removeLayers();
    this.map.addLayers(counties);
  });

  constructor(private map: MapboxMap, private searchService: SearchService) {}

  ngAfterViewInit(): void {
    this.map.init('map');
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}

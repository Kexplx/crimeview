import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { MapboxMap } from './mapbox-map';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private searchSub: Subscription = this.searchService.search$.subscribe(({ counties }) => {
    this.map.removeLayers();
    this.map.addLayers(counties);
  });

  constructor(private map: MapboxMap, private searchService: SearchService) {}

  ngAfterViewInit(): void {
    this.map.init('map');
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}

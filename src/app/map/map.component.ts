import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { District } from '../district/interfaces/district';
import { SearchService } from '../search.service';
import { MapService } from './map.service';
import { geoJSON, GeoJSON, LatLngTuple, Map, tileLayer } from 'leaflet';

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
  private _map: Map | undefined;
  private _clickedLayer: GeoJSON | undefined;
  private _layers: GeoJSON[] = [];

  private searchSubscription = this.searchService.search$.subscribe(({ districts }) => {
    this.resetMap();
    this.addLayers(districts);
  });

  private get map(): Map {
    if (this._map) {
      return this._map;
    } else {
      throw new Error('Map was used while undefined. Call #init first.');
    }
  }

  private set map(map: Map) {
    this._map = map;
  }

  constructor(private mapService: MapService, private searchService: SearchService) {}

  ngAfterViewInit(): void {
    this.map = new Map('map', { zoomControl: false }).setView([51.2449, 10.6597], 7);

    tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 10,
      minZoom: 7,
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private resetMap(): void {
    for (const layer of this._layers) {
      this.map.removeLayer(layer);
    }

    this._clickedLayer = undefined;
  }

  private addLayers(districts: District[]): void {
    for (const district of districts) {
      this.addLayer(district);
    }

    this.fitBounds(districts);
  }

  private addLayer(district: District): void {
    const { geometry, relativeOffencesCount, code } = district;

    const layer = geoJSON(geometry, {
      style: {
        weight: 1,
        opacity: 0.2,
        color: '#34495e',
        fillOpacity: 0.4,
        fillColor: this.getColorByOffencesCount(relativeOffencesCount),
      },
    });

    layer.on('click', () => {
      if (this._clickedLayer !== layer) {
        this._clickedLayer?.resetStyle();
        this._clickedLayer = layer;
        layer.setStyle({ fillOpacity: 0.7 });

        this.mapService.onDistrictClick(code);
      }
    });

    layer.addTo(this.map);
    this._layers.push(layer);
  }

  private fitBounds(districts: District[]): void {
    const bounds: LatLngTuple[] = [];

    for (const { geometry } of districts) {
      if (geometry?.type === 'Polygon') {
        const [lng, lat] = geometry?.coordinates[0][0];

        bounds.push([lat, lng]);
      } else if (geometry?.type === 'MultiPolygon') {
        const [lng, lat] = geometry?.coordinates[0][0][0];

        bounds.push([lat, lng]);
      }
    }

    this.map.fitBounds(bounds);
  }

  private getColorByOffencesCount(offencesCount: number | undefined): string {
    if (!offencesCount) {
      return 'gray';
    }

    return offencesCount <= 3000
      ? '#2ecc71'
      : offencesCount <= 4500
      ? '#f1c40f'
      : offencesCount <= 7000
      ? '#e67e22'
      : '#e74c3c';
  }
}

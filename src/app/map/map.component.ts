import { AfterViewInit, Component, Input } from '@angular/core';
import { County } from '../county/models/county';
import { Map } from 'mapbox-gl';
import { MapboxConfig } from './mapbox-config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() set counties(counties: County[] | null) {
    console.log('Hello World');

    if (this.map && counties) {
      for (const county of counties) {
        this.addGeojsonLayer(this.map, county);
      }
    }
  }

  private map: undefined | Readonly<Map>;

  constructor(private readonly config: MapboxConfig) {}

  ngAfterViewInit(): void {
    this.map = new Map({
      accessToken: this.config.accessToken,
      style: this.config.styleLight,
      center: [11.0767, 49.4521], // Nuremberg coords (lng, lat) as starting position.
      container: 'map',
      maxZoom: 9,
      zoom: 8,
    });
  }

  private addGeojsonLayer(map: Map, county: County): void {
    const { countyCode, name, state, geometry, type, crimeRate } = county;

    map.addLayer({
      id: Math.random().toString(),
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name, type, state, crimeRate, countyCode },
          geometry,
        },
      },
      maxzoom: 11,
      paint: {
        'fill-color': this.getColorByCrimeRate(crimeRate),
        'fill-opacity': 0.2,
        'fill-outline-color': 'gray',
        'fill-opacity-transition': { delay: 0, duration: 0 },
      },
    });
  }

  private getColorByCrimeRate(crimeRate: number | undefined): string {
    if (!crimeRate) {
      return 'gray';
    }

    return crimeRate <= 0.04 ? 'green' : crimeRate <= 0.07 ? 'orange' : 'red';
  }
}

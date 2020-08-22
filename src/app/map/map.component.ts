import { AfterViewInit, Component, Input } from '@angular/core';
import { County } from '../county/models/county';
import { Map, Popup } from 'mapbox-gl';
import { MapboxConfig } from './mapbox-config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() set counties(counties: County[] | null) {
    if (this.map && counties) {
      for (const county of counties) {
        this.addGeojsonLayer(this.map, county);
      }
    }
  }

  private map: undefined | Readonly<Map>;

  private selectedLayerId = '';

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
    const { geometry, crimeRate } = county;

    const id = Math.random().toString();

    map.addLayer({
      id,
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: county,
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

    this.handleLayerClicks(map, id);
  }

  private handleLayerClicks(map: Map, id: string): void {
    map.on('click', id, ({ features, lngLat }) => {
      if (this.selectedLayerId) {
        map.setPaintProperty(this.selectedLayerId, 'fill-opacity', 0.2);
      }
      map.setPaintProperty(id, 'fill-opacity', 0.5);
      this.selectedLayerId = id;

      if (features) {
        const html = this.buildLayerClickHtml(features[0].properties as County);
        new Popup().setLngLat(lngLat).setHTML(html).addTo(map);
      }
    });
  }

  private buildLayerClickHtml({ name, state, type, crimeRate }: County): string {
    return `
    <p>${name}</p>
    <p>${type} in ${state}</p>
    <p style="${this.getColorByCrimeRate(crimeRate)}">Kriminalitätsrate: ${crimeRate}</p>`;
  }

  private getColorByCrimeRate(crimeRate: number | undefined): string {
    if (!crimeRate) {
      return 'gray';
    }

    return crimeRate <= 0.04 ? 'green' : crimeRate <= 0.07 ? 'orange' : 'red';
  }
}

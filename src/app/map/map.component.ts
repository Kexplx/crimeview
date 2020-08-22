import { AfterViewInit, Component, Input } from '@angular/core';
import { County } from '../county/models/county';
import { Map, Popup, LngLatBounds, Layer } from 'mapbox-gl';
import { MapboxConfig } from './mapbox-config';

interface CountyLayer extends Layer {
  id: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() set counties(counties: County[] | null) {
    if (this.map && counties) {
      for (const id of this.layers.map(l => l.id)) {
        this.map.removeLayer(id);
      }
      this.layers = [];

      for (const county of counties) {
        this.addGeojsonLayer(this.map, county);
      }

      this.fitMapToLayers(this.map, counties);
    }
  }

  private map: undefined | Readonly<Map>;
  private clickedLayer: CountyLayer | undefined;
  private layers: Readonly<CountyLayer[]> = [];

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

    const layer: CountyLayer = {
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
    };

    this.map?.addLayer(layer);
    this.handleLayerClicks(map, layer);
    this.layers = [...this.layers, { ...layer, id }];
  }

  private handleLayerClicks(map: Map, layer: CountyLayer): void {
    map.on('click', layer.id, ({ features, lngLat }) => {
      if (this.clickedLayer) {
        map.setPaintProperty(this.clickedLayer.id, 'fill-opacity', 0.2);
      }
      map.setPaintProperty(layer.id, 'fill-opacity', 0.5);
      this.clickedLayer = layer;

      if (features) {
        const html = this.getPopupHtml(features[0].properties as County);
        new Popup().setLngLat(lngLat).setHTML(html).addTo(map);
      }
    });
  }

  private getPopupHtml({ name, state, type, crimeRate }: County): string {
    return `
    <h4>${name}</h4>
    <p>${type} in ${state}</p>
    <p>Kriminalitätsrate:
      <span style="color: ${this.getColorByCrimeRate(crimeRate)}">${crimeRate}</span>
    </p>`;
  }

  private getColorByCrimeRate(crimeRate: number | undefined): string {
    if (!crimeRate) {
      return 'gray';
    }

    return crimeRate <= 0.04 ? 'green' : crimeRate <= 0.07 ? 'orange' : 'red';
  }

  private fitMapToLayers(map: Map, counties: County[]): void {
    const bounds = new LngLatBounds();

    for (const { geometry } of counties) {
      if (geometry.type === 'Polygon') {
        const [lat, lng] = geometry.coordinates[0][0];
        bounds.extend({ lat, lng });
      } else if (geometry.type === 'MultiPolygon') {
        const [lat, lng] = geometry.coordinates[0][0][0];
        bounds.extend({ lat, lng });
      }
    }

    map.fitBounds(bounds);
  }
}

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Layer, LngLatBounds, Map } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { District } from '../district/interfaces/district';
import { SearchService } from '../search.service';
import { MapService } from './map.service';
import { shortid } from '../shared/utils/shortid';

const { accessToken, styleLight } = environment.urls.mapbox;

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
  private _clickedLayer: Layer | undefined;
  private _layers: Layer[] = [];
  private _map: Map | undefined;

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

  private searchSubscription = this.searchService.search$.subscribe(({ districts }) => {
    this.removeLayers();
    this.addLayers(districts);
  });

  constructor(private mapService: MapService, private searchService: SearchService) {}

  ngAfterViewInit(): void {
    this.initMap('map');
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private initMap(id: string): void {
    this.map = new Map({
      accessToken,
      style: styleLight,
      center: [11.0767, 49.4521], // Nuremberg's coordinates
      container: id,
      maxZoom: 9,
      minZoom: 6.5,
      pitch: 30, // Degrees
      zoom: 8,
    });
  }

  private addLayers(districts: District[]): void {
    for (const district of districts) {
      this.addLayer(district);
    }

    this.fitBounds(districts);
  }

  private addLayer(district: District): void {
    const { geometry, relativeOffencesCount } = district;

    const layer: Layer = {
      id: shortid(),
      type: 'fill',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: district,
          geometry,
        },
      },
      maxzoom: 11,
      paint: {
        'fill-color': this.getColorByOffencesCount(relativeOffencesCount),
        'fill-opacity': 0.3,
        'fill-outline-color': 'gray',
        'fill-opacity-transition': { delay: 0, duration: 0 },
      },
    };

    this.map.addLayer(layer);
    this.handleLayerClicks(layer);
    this._layers.push(layer);
  }

  private removeLayers(): void {
    for (const { id } of this._layers) {
      this.map.removeLayer(id);
      this.map.removeSource(id);
    }

    this._layers = [];
    this._clickedLayer = undefined;
  }

  private handleLayerClicks(layer: Layer): void {
    this.map.on('click', layer.id, ({ features }) => {
      if (this._clickedLayer) {
        this.map.setPaintProperty(this._clickedLayer.id, 'fill-opacity', 0.3);
      }

      this.map.setPaintProperty(layer.id, 'fill-opacity', 0.6);
      this._clickedLayer = layer;

      if (features) {
        this.mapService.onDistrictClick(features[0].properties?.code);
      }
    });
  }

  private fitBounds(districts: District[]): void {
    const bounds = new LngLatBounds();

    for (const { geometry } of districts) {
      let lng;
      let lat;

      if (geometry.type === 'Polygon') {
        [lng, lat] = geometry.coordinates[0][0];
      } else if (geometry.type === 'MultiPolygon') {
        [lng, lat] = geometry.coordinates[0][0][0];
      }

      if (lat && lng) {
        bounds.extend([lng, lat]);
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

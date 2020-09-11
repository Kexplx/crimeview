import { MapComponent } from './map.component';
import { SearchService, Search } from '../search.service';
import { Subject } from 'rxjs';
import { MapboxMap } from './mapbox-map';

let component: MapComponent;
let mapboxMapStub: { init: jest.Mock; removeLayers: jest.Mock; addLayers: jest.Mock };

const search$ = new Subject<Search>();
const searchServiceStub = {
  search$,
};

beforeEach(() => {
  mapboxMapStub = {
    init: jest.fn(() => {}),
    addLayers: jest.fn(() => {}),
    removeLayers: jest.fn(() => {}),
  };

  component = new MapComponent(
    (mapboxMapStub as unknown) as MapboxMap,
    (searchServiceStub as unknown) as SearchService,
  );
});

describe('constructor', () => {
  it('should call #removeLayers when search$ emits a search object', () => {
    search$.next({} as Search);

    expect(mapboxMapStub.removeLayers).toHaveBeenCalled();
  });

  it('should call #addLayers when search$ emits a search object', () => {
    search$.next({} as Search);

    expect(mapboxMapStub.addLayers).toHaveBeenCalled();
  });
});

describe('ngAfterViewInit', () => {
  it('should call #init with id="map"', () => {
    component.ngAfterViewInit();
    expect(mapboxMapStub.init).toHaveBeenCalled();
    expect(mapboxMapStub.init).toHaveBeenCalledWith('map');
  });
});

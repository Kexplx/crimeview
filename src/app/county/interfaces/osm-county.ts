import { Geometry } from 'geojson';

/**
 * The structure of a county oject returned by openstreetmap's api.
 */
export interface OsmCounty {
  name_1: string; // state, e.g. "Bayern"
  name_2: string; // name, e.g. "Regensburg"
  type_2: string; // type, e.g. "Landkreis", "Kreisfreihe Stadt"
  cca_2: string; // county code
  geo_shape: Geometry;
}

import { Geometry } from 'geojson';

/**
 * The structure of a county oject returned by openstreetmap's `kreis` dataset.
 */
export interface OsmCounty {
  gen: string; // name, e.g. "Regensburg"
  bez: string; // type, e.g. "Landkreis", "Kreisfreihe Stadt"
  bundesland: string; // state, e.g. "Bayern"
  bundesland_code: string; // state code
  /**
   * County code and more.
   *
   * If `bundesland_code` starts with '1', the county code
   * consists of the first 5 digits of `sdv_rs`.
   */
  sdv_rs: string;
  geo_shape: Geometry;
}

import { Geometry } from 'geojson';

/**
 * The structure of a district oject returned by openstreetmap's `georef-germany-kreis` dataset.
 */
export interface OsmDistrict {
  krs_code: string; // district code
  lan_name: string; // state, e.g. "Bayern"
  geo_shape: Geometry;
}

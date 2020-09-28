import { Geometry } from 'geojson';

/**
 * The structure of a district oject returned by opendatasoft's `georef-germany-kreis` dataset.
 */
export interface OpendatasoftDistrict {
  krs_code: string; // district code
  lan_name: string; // state, e.g. "Bayern"
  geo_shape: Geometry;
}

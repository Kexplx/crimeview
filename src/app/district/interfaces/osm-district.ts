import { Geometry } from 'geojson';
import { DistrictType } from './district';

/**
 * The structure of a district oject returned by openstreetmap's `georef-germany-kreis` dataset.
 */
export interface OsmDistrict {
  krs_code: string; // district code
  krs_name_short: string; // name, e.g. "Regensburg"
  krs_type: DistrictType; // type, e.g. "Landkreis", "Kreisfreie Stadt", "Kreis"
  lan_name: string; // state, e.g. "Bayern"
  geo_shape: Geometry;
}

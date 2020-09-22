import { Geometry } from 'geojson';
import { CountyType } from './county';

/**
 * The structure of a county oject returned by openstreetmap's `georef-germany-kreis` dataset.
 */
export interface OsmCounty {
  krs_code: string; // county code
  krs_name_short: string; // name, e.g. "Regensburg"
  krs_type: CountyType; // type, e.g. "Landkreis", "Kreisfreie Stadt", "Kreis"
  lan_name: string; // state, e.g. "Bayern"
  geo_shape: Geometry;
}

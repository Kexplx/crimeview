import { Geometry } from 'geojson';

/**
 * The structure of a county.
 */
export interface County {
  name: string;
  state: string;
  type: string;
  countyCode: number;
  crimeRate: number | undefined;
  geometry: Geometry;
}

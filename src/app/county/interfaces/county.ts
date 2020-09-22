import { Geometry } from 'geojson';

export type CountyType = 'Landkreis' | 'Kreis' | 'Kreisfreie Stadt';

/**
 * The structure of a county.
 */
export interface County {
  name: string;
  state: string;
  type: CountyType;
  countyCode: string;
  crimeRate: number | undefined;
  geometry: Geometry;
}

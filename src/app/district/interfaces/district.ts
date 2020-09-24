import { Geometry } from 'geojson';

export type DistrictType = 'Landkreis' | 'Kreis' | 'Kreisfreie Stadt';

/**
 * The structure of a district.
 */
export interface District {
  name: string;
  state: string;
  type: DistrictType;
  districtCode: string;
  crimeRate: number | undefined;
  geometry: Geometry;
}

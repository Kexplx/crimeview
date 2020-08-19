/**
 * The structure of a county.
 */
export interface County {
  name: string;
  state: string;
  type: string;
  countyCode: number;
  crimeRate: number | undefined;
  geoShape: {
    type: 'Polygon' | 'Multipolygon';
    coordinates: number[][];
  };
}

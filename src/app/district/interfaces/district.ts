import { Geometry } from 'geojson';

export type DistrictType = 'Landkreis' | 'Kreis' | 'Kreisfreie Stadt';

/**
 * Represents a german district.
 */
export interface District {
  code: number; // A unique identifier with 5 characters.
  name: string;
  type: DistrictType;
  population: number;
  crestUrl: string; // The url of the districts's crest as svg.
  stateName: string; // The federal state containing the district.

  totalOffencesCount: number;
  relativeOffencesCount: number; // Number of offences per 100.000 inhabitants.
  commonOffences: { offenceName: string; offencesCount: number }[];
  totalSuspectsCount: number;
  nonGermanSuspectsCount: number; //
  solvedCasesCount: number;

  geometry: Geometry;
}

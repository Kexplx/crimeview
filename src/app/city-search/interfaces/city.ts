export interface Position {
  lat: number;
  lng: number;
}

export interface City {
  placeId: string;
  name: string;
  position: Position;
}

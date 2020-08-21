import { decode } from 'base-64';
/**
 * Provides credentials for mapbox.
 */
export class MapboxConfig {
  private readonly _accessToken = 'cGsuZXlKMUlqb2lhMlY0Y0d4NElpd2lZU0k2SW1Ock5uSnliVEZzWnpBM056WXphMjE1Tkdsek0yUjJiRFlpZlEuRWNseUFUQWx1NW5OT2Z3Tmt4dWk0QQ==';
  private readonly _styleDark = 'bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZycnBqMmEwcDVwMWlwaGVyOHZhbGsyP29wdGltaXplPXRydWU=';
  private readonly _styleLight = 'bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZyc2l5aGcweDIwMWludjR2ZjF2bnQxP29wdGltaXplPXRydWU=';

  get accessToken(): string {
    return decode(this._accessToken);
  }

  get styleDark(): string {
    return decode(this._styleDark);
  }

  get styleLight(): string {
    return decode(this._styleLight);
  }
}

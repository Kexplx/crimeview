// tslint:disable
import { decode } from 'js-base64';

const _styleDark_b64 = 'bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZycnBqMmEwcDVwMWlwaGVyOHZhbGsyP29wdGltaXplPXRydWU=',
      _styleLight_b64 = 'bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZyc2l5aGcweDIwMWludjR2ZjF2bnQxP29wdGltaXplPXRydWU=',
      _accessToken_b64 = 'cGsuZXlKMUlqb2lhMlY0Y0d4NElpd2lZU0k2SW1Ock5uSnliVEZzWnpBM056WXphMjE1Tkdsek0yUjJiRFlpZlEuRWNseUFUQWx1NW5OT2Z3Tmt4dWk0QQ==';

export const MAPBOX_CREDENTIALS = {
  styleDark: decode(_styleDark_b64),
  styleLight: decode(_styleLight_b64),
  accessToken: decode(_accessToken_b64),
};

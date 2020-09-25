// tslint:disable
import { decode } from 'js-base64';

// prettier-ignore
export const environment = {
  production: false,

  urls: {
    lambda: {
      getDistrictsById : 'https://uj7bdqwq33.execute-api.eu-central-1.amazonaws.com/default/getDistrictById',
    },
    openstreetmap: {
      districtsByRadius: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,lan_name,geo_shape&geofilter.distance=',
      districtsByLine: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,lan_name,geo_shape&geofilter.polygon=',
      districtsByPolygon: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,lan_name,geo_shape&geofilter.polygon=',
    },
    mapbox: {
      styleDark: decode('bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZycnBqMmEwcDVwMWlwaGVyOHZhbGsyP29wdGltaXplPXRydWU='),
      styleLight: decode('bWFwYm94Oi8vc3R5bGVzL2tleHBseC9jazZyc2l5aGcweDIwMWludjR2ZjF2bnQxP29wdGltaXplPXRydWU='),
      accessToken: decode('cGsuZXlKMUlqb2lhMlY0Y0d4NElpd2lZU0k2SW1Ock5uSnliVEZzWnpBM056WXphMjE1Tkdsek0yUjJiRFlpZlEuRWNseUFUQWx1NW5OT2Z3Tmt4dWk0QQ=='),
    }
  }
};

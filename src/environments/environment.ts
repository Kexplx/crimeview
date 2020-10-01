// prettier-ignore
export const environment = {
  production: false,

  urls: {
    lambda: {
      getDistrictsById : 'https://uj7bdqwq33.execute-api.eu-central-1.amazonaws.com/default/getDistrictById',
    },
    opendatasoft: {
      districtsByRadius: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,geo_shape&geofilter.distance=',
      districtsByLine: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,geo_shape&geofilter.polygon=',
      districtsByPolygon: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-germany-kreis&rows=403&fields=krs_code,geo_shape&geofilter.polygon=',
    },
  }
};

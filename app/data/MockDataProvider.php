<?php

/**
 * Provides sapmle data based on IDataProvider
 * 
 * Only used for easier development
 * 
 */
class MockDataProvider implements IDataProvider
{
    /**
     * Gets CrimeRate for a countyname.
     * 
     * @param string $countyName.
     *
     * @return float amount of crimes per x inhabitants
     */
    public function getCountyCrimeRate(string $countyName): float
    {
        switch(strtolower($countyName))
        {
            case "neumarkt in der oberpfalz":
                return 0.2;
            case "regensburg":
                return 0.15;
            case "nürnberger land":
                return 0.3;
            case "erlangen":
                return 0.1;
            case "erlangen-höchstadt":
                return 0.12;
            default:
                return 0.4;
        }
    }

    /**
     * Gets all Counties on a Route.
     * 
     * @param City $from.
     * @param City $to.
     * 
     * MockDataProvider ignores input values
     * Only read data from given geojson file
     *
     * @return array of Counties on given route.
     */
    public function getCountiesOnRoute(City $from, City $to): array
    {
        $pathToGeoJson = "app/data/geojson/landkreise.geojson";
        $geoJson= file_get_contents($pathToGeoJson);
        $rawArray = json_decode($geoJson, true);
        $countiesArray = $rawArray["features"];

        $counties = array();

        foreach($countiesArray as $county)
        {
            $name = $county["properties"]["name_2"];
            $type = $county["properties"]["engtype_2"];
            $stateName = $county["properties"]["name_1"];
            // $geo = $county["geometry"]["coordinates"][0];
            $geo = json_encode($county);

            $counties[] = new County($name, $type, $stateName, $geo);
        }

        return $counties;
    }

    /**
     * Gets City Model from Name.
     * 
     * @param string $name Cityname.
     *
     * @return City Citymodel.
     */
    public function getCityFromName(string $name): City
    {
        switch(strtolower($name))
        {
            case "regensburg": 
                return new City("Regensburg, Oberpfalz, Bayern, 93047, Deutschland","city",49.0195333,12.0974869);
            case "nuernberg": 
                return new City("Nürnberg, Mittelfranken, Bayern, Deutschland","city",49.453872,11.077298);
            case "erlangen": 
                return new City("Erlangen, Mittelfranken, Bayern, 91052, Deutschland","city",49.5981187,11.003645);
            default: 
                return new City("Hamburg, 20095, Deutschland","city",53.550341,10.000654);
        }
    }
}
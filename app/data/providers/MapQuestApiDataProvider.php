<?php

/**
 * MapQuestApiProvider uses MapQuestApi to retrieve city information.
 */
class MapQuestApiDataProvider implements ICityDataProvider
{
    public function getCityByName(string $name): ?City
    {
        $clean_name = trim(explode(",", $name)[0]);
        $url = "http://www.mapquestapi.com/geocoding/v1/address?key=&location={$clean_name}";

        $body = file_get_contents($url);
        $json = json_decode($body);
        $status = $json->info->statuscode;

        if ($status != 0) {
            throw new InvalidArgumentException("City not found: $name");
        }

        $countryCode = $json->results[0]->locations[0]->adminArea1;

        if ($countryCode != 'DE') {
            throw new InvalidArgumentException("City not found: $name");
        }

        return new City(
            $json->results[0]->locations[0]->adminArea5,
            $json->results[0]->locations[0]->adminArea5Type,
            $json->results[0]->locations[0]->latLng->lat,
            $json->results[0]->locations[0]->latLng->lng
        );
    }
}

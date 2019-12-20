/**
 * Generates a bootstrap card for the given values which 
 * displays general information about the route.
 * Then appends the card to the given container.
 * 
 * @param {string} container The html element to append to.
 * @param {string} json The json object containing the route information.
 */
function appendRouteInformationCard(container, json) {
    append(container, routeInformationCardTemplate, ([
        ["to", json.to.city.name.replace(/,.+,?$/g, '')],
        ["from", json.from.city.name.replace(/,.+,?$/g, '')],
        ["averageCrimeRate", json.averageCrimeRate],
        ["countCounties", json.counties.length],
        ["averageCrimeRateColor", getColorByCrimeRate(json.averageCrimeRate)],
    ]));
}

/**
 * Generates a placeholder bootstrap card for the given values.
 * Then appends the card to the given container.
 * 
 * @param {string} container The html element to append to.
 */
function appendPlaceholderCard(container) {
    append(container, countyPlaceholderCardTemplate);
}

/**
 * Generates a bootstrap card for the given values.
 * Then appends the card to the given container.
 * 
 * @param {string} container The html element to append to.
 * @param {string} json The json object containing the route information.
 * @param {string} card_id The id randomly generated ID this card will receive.
 */
function appendCountyCard(container, json, card_id) {
    let distributionYear0 = "",
        distributionYear1 = "",
        distributionYear2 = "";

    json.county.crimeStats[0].distribution.forEach(dist => {
        distributionYear0 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
    });

    json.county.crimeStats[1].distribution.forEach(dist => {
        distributionYear1 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
    });

    json.county.crimeStats[2].distribution.forEach(dist => {
        distributionYear2 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
    });

    append(container, countyCardTemplate, ([
        ["card-id", card_id],
        ["countyName", json.county.name],
        ["countyType", json.county.type],
        ["year0", json.county.crimeStats[0].year],
        ["year1", json.county.crimeStats[1].year],
        ["year2", json.county.crimeStats[2].year],
        ["distributionYear0", distributionYear0],
        ["distributionYear1", distributionYear1],
        ["distributionYear2", distributionYear2],
        ["crimeRateYear0", json.county.crimeStats[0].rate],
        ["crimeRateYear1", json.county.crimeStats[1].rate],
        ["crimeRateYear2", json.county.crimeStats[2].rate],
        ["crimeRateYear0Color", getColorByCrimeRate(json.county.crimeStats[0].rate)],
        ["crimeRateYear1Color", getColorByCrimeRate(json.county.crimeStats[1].rate)],
        ["crimeRateYear2Color", getColorByCrimeRate(json.county.crimeStats[2].rate)],
    ]));
}

/**
 * Interpolates a template string with given values in the interPolateMap.
 * Then appends the interpolated string to the container.
 * 
 * @param {string} container The html element to append to.
 * @param {string} template The template string to interpolate.
 * @param {Map<string, any>} interPolateMap The Map to interpolate with.
 */
function append(container, template, interPolateMap) {
    if (interPolateMap) {
        interPolateMap.forEach((values, _) => {
            template = template.replace(new RegExp(`{{${values[0]}}}`, 'g'), values[1]);
        })
    }

    $('.' + container).append(template);
}
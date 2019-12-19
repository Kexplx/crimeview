const reconfigurableOptions = {
    countries: ['de'],
    type: 'city',
    aroundLatLngViaIP: false
};

/**
 * Both of these Ids are public and meant to be used directly in the source.
 * See https://www.algolia.com/doc/api-client/getting-started/install/javascript/?language=javascript for more information.
 */
const appId = "plXRD1IMI80E";
const publicApiKey = "00f22d317e3469a60acffe3d3e316f6f";

/**
 * Initializes the used Algolia service.
 * 
 * @param {Array<string>} inputIds The Ids of the input fields to initialize on.
 */
function initializeAlgoliaInputs(inputIds) {
    places({
        appId: appId,
        apiKey: publicApiKey,
        container: document.querySelector(inputIds[0]),
    }).configure(reconfigurableOptions);

    places({
        appId: appId,
        apiKey: publicApiKey,
        container: document.querySelector(inputIds[1]),
    }).configure(reconfigurableOptions);
}
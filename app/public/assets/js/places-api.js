$("head").append('<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/places.js@1.17.0"></script>');

const reconfigurableOptions = {
    countries: ['de'],
    type: 'city',
    aroundLatLngViaIP: false
};

const appId = "plXRD1IMI80E";
const publicApiKey = "00f22d317e3469a60acffe3d3e316f6f";

function initPlacesApi() {
    places({
        appId: appId,
        apiKey: publicApiKey,
        container: document.querySelector('#inputTo'),
    }).configure(reconfigurableOptions);

    places({
        appId: appId,
        apiKey: publicApiKey,
        container: document.querySelector('#inputFrom'),
    }).configure(reconfigurableOptions);
}
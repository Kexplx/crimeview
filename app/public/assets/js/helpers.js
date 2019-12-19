/**
 * Returns a color as string for the given CrimeRate.
 * 
 * @param {number} crimeRate The crime rate to generate a color for.
 * 
 * @returns {string} The Hexvalue of the color.
 */
function getColorByCrimeRate(crimeRate) {
    switch (true) {
        case (crimeRate == 0):
            return "#777";
        case (crimeRate <= 0.04):
            return "#27ae60";
        case (crimeRate <= 0.07):
            return "#ff7e29";
        default:
            return "#c0392b";
    }
}

/**
 * Returns a random string with the given length in the Range [a-zA-Z]
 * 
 * @param {number} length The length of the generated string.
 * 
 * @returns {string} The random string.
 */
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
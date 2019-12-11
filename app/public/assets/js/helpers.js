function getColorByCrimeRate(crimeRate) {
    var x = crimeRate;
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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
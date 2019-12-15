function appendRouteInformationCard(container, from, to, json) {
    $(container).append(
        '<div class="card" id="cardRouteInformation">' +
        '<div class="card-body ">' +
        '<div style="display:flex; justify-content:space-between; align-items:baseline;"><h5 class="card-title">Average CR on route = <span style="color:' + getColorByCrimeRate(json.averageCrimeRate) + ';">' + json.averageCrimeRate + '</span></h5><button id="btnCvCompact" style="width:135px" class="btn btn-outline-dark btn-sm" onclick="this.blur();">CrimeView <small style="color:gray">Compact</small></button></div>' +
        '<p class="card-text "> On your way from ' + from.replace(/,.+,?$/g, '') + ' to ' + to.replace(/,.+,?$/g, '') + ' you will pass ' +
        json.counties.length + ' german counties.</strong> The colors on the map stem from the counties crime rate (cr).</p>' +
        '</div>' +
        '</div>'
    );

    $("#btnCvCompact").click(function() {
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val("localhost:4040/compact?from=" + from.replace(/,.+,?$/g, '') + "&to=" + to.replace(/,.+,?$/g, '')).select();
        document.execCommand('copy');
        $temp.remove();
        $("#btnCvCompact").html('Link copied!');
        $("#btnCvCompact").removeClass("btn-outline-dark");
        $("#btnCvCompact").addClass("btn-success");
    })
}

function appendPlaceholderCard(container) {
    $(container).append(
        '<div id="placeholderCard" class="card bg-light mb-3" style="text-align:center; height:295px; width:100%; margin-top:20px">' +
        '<div class="card-body">' +
        '<h5 class="card-title">Select a county on the map.</h5>' +
        '<small><p>For each selection we\'ll display a counties crime rate and it\'s crime contribution</p></small>' +
        '<img src="assets/images/select.svg" style="margin-top:30px; width:70px">' +
        '</div>' +
        '</div>'
    );
}

function appendCountyCard(container, element, card_id) {
    if (element.county.crimeStats[0] == undefined || element.county.crimeStats[1] == undefined || element.county.crimeStats[2] == undefined) {
        $(container).append(
            '<div id="' + card_id + '"class="card bg-light mb-3" style="width:100%; height:295px; display:none; margin-top:20px">' +
            '<div class="card-header"> ' +
            '<ul class="nav nav-tabs card-header-tabs pull-right"  id="myTab" role="tablist">' +
            '<li class="nav-item">' +
            '<a class="nav-link active" style="color:black" id="year1-tab" data-toggle="tab" href="#year1' + card_id + '" role="tab" aria-controls="year1" aria-selected="true">-</a>' +
            '</li>' +
            '<li class="nav-item">' +
            '    <a class="nav-link" style="color:black" id="year2-tab" data-toggle="tab" href="#year2' + card_id + '" role="tab" aria-controls="year2" aria-selected="false">-</a>' +
            '</li>' +
            '<li class="nav-item">' +
            '    <a class="nav-link" style="color:black" id="year3-tab" data-toggle="tab" href="#year3' + card_id + '" role="tab" aria-controls="year3" aria-selected="false">-</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="tab-content">' +
            '<div class="tab-pane fade show active" id="year1' + card_id + '" role="tabpanel" aria-labelledby="year1-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">No crime data available.</p>' +
            '</div>' +
            '<div class="tab-pane fade" id="year2' + card_id + '" role="tabpanel" aria-labelledby="year2-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">No crime data available.</p>' +
            '</div>' +
            '<div class="tab-pane fade" id="year3' + card_id + '" role="tabpanel" aria-labelledby="year3-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">No crime data available.</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    } else {

        let dist_string1 = "<p>Most common crimes in " + element.county.crimeStats[0].year + ".</p><ul>";
        element.county.crimeStats[0].distribution.forEach(dist => {
            dist_string1 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
        });

        let dist_string2 = "<p>Most common crimes in " + element.county.crimeStats[1].year + ".</p><ul>";
        element.county.crimeStats[1].distribution.forEach(dist => {
            dist_string2 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
        });

        let dist_string3 = "<p>Most common crimes in " + element.county.crimeStats[2].year + ".</p><ul>";
        element.county.crimeStats[2].distribution.forEach(dist => {
            dist_string3 += "<li>" + Object.keys(dist)[0].replace(/ §[^:]*/, '').replace(/:/, '') + ": " + Object.values(dist)[0] + "</li>";
        });

        $(container).append(
            '<div id="' + card_id + '"class="card bg-light mb-3" style="width:100%; display:none; margin-top:20px">' +
            '<div class="card-header"> ' +
            '<ul class="nav nav-tabs card-header-tabs pull-right"  id="myTab" role="tablist">' +
            '<li class="nav-item">' +
            '<a class="nav-link active" style="color:black" id="year1-tab" data-toggle="tab" href="#year1' + card_id + '" role="tab" aria-controls="year1" aria-selected="true">' + element.county.crimeStats[0].year + '</a>' +
            '</li>' +
            '<li class="nav-item">' +
            '    <a class="nav-link" style="color:black" id="year2-tab" data-toggle="tab" href="#year2' + card_id + '" role="tab" aria-controls="year2" aria-selected="false">' + element.county.crimeStats[1].year + '</a>' +
            '</li>' +
            '<li class="nav-item">' +
            '    <a class="nav-link" style="color:black" id="year3-tab" data-toggle="tab" href="#year3' + card_id + '" role="tab" aria-controls="year3" aria-selected="false">' + element.county.crimeStats[2].year + '</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="card-body">' +
            '<div class="tab-content">' +
            '<div class="tab-pane fade show active" id="year1' + card_id + '" role="tabpanel" aria-labelledby="year1-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">CR = <span style="color:' + getColorByCrimeRate(element.county.crimeStats[0].rate) + ';">' + element.county.crimeStats[0].rate + '</span></p>' +
            '<p class="card-text">' + dist_string1 + '</p>' +
            '</div>' +
            '<div class="tab-pane fade" id="year2' + card_id + '" role="tabpanel" aria-labelledby="year2-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">CR = <span style="color:' + getColorByCrimeRate(element.county.crimeStats[1].rate) + ';">' + element.county.crimeStats[1].rate + '</span></p>' +
            '<p class="card-text">' + dist_string2 + '</p>' +
            '</div>' +
            '<div class="tab-pane fade" id="year3' + card_id + '" role="tabpanel" aria-labelledby="year3-tab">' +
            '<h5>' + element.county.name + " - " + element.county.type + '</h5>' +
            '<p class="card-title">CR = <span style="color:' + getColorByCrimeRate(element.county.crimeStats[2].rate) + ';">' + element.county.crimeStats[2].rate + '</span></p>' +
            '<p class="card-text">' + dist_string3 + '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
}
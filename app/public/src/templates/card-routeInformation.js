const routeInformationCardTemplate = `
<div class="card" id="cardRouteInformation">
    <div class="card-body ">
        <div style="display:flex; align-items:baseline;">
            <h5 class="card-title">
                Average CR on route = 
                <span style="color: {{averageCrimeRateColor}}"> {{averageCrimeRate}} </span>
            </h5>
            <a id="btnCvCompact" href="javascript:void(0);" onclick= "copyToClipboard('{{from}}', '{{to}}', this);" class="badge badge-secondary ml-2">
                CrimeView <small>Compact</small>
            </a>        
        </div>   
        <p class="card-text ">
            On your way from {{from}} to {{to}} you will pass {{countCounties}} german counties.</strong> The colors on the map stem from the counties crime rate (cr).
        </p>
    </div>
</div>`;

function copyToClipboard(from, to, element) {
    let $temp = $('<input>');
    $('body').append($temp);
    $temp.val(location.origin + "/compact?from=" + from.replace(/,.+,?$/g, '') + "&to=" + to.replace(/,.+,?$/g, '')).select();
    document.execCommand('copy');
    $temp.remove();

    $(element).html('Link copied!');
    $(element).addClass("badge-success");
}
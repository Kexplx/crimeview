const countyCardTemplate = `
<div id="{{card-id}}" class="card bg-light mb-3" style="width:100%; display:none; margin-top:20px">
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs pull-right" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" style="color:black" id="year1-tab" data-toggle="tab" href="#year1{{card-id}}" role="tab" aria-controls="year1" aria-selected="true"> {{year0}} </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" style="color:black" id="year2-tab" data-toggle="tab" href="#year2{{card-id}}" role="tab" aria-controls="year2" aria-selected="false"> {{year1}} </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" style="color:black" id="year3-tab" data-toggle="tab" href="#year3{{card-id}}" role="tab" aria-controls="year3" aria-selected="false"> {{year2}} </a>
            </li>
        </ul>
    </div>
    <div class="card-body">
    <div class="tab-content">
        <div class="tab-pane fade show active" id="year1{{card-id}}" role="tabpanel" aria-labelledby="year1-tab">
            <h5> {{countyName}} - {{countyType}} </h5>
            <p class="card-title">CR = <span style="color: {{crimeRateYear0Color}} ;"> {{crimeRateYear0}} </span></p>
            <p class="card-text">Most common crimes in {{year0}}</p>
            <ul>
            {{distributionYear0}}
            </ul>
        </div>
        <div class="tab-pane fade" id="year2{{card-id}}" role="tabpanel" aria-labelledby="year2-tab">
            <h5> {{countyName}} - {{countyType}} </h5>
            <p class="card-title">CR = <span style="color: {{crimeRateYear1Color}} ;"> {{crimeRateYear1}} </span></p>
            <p class="card-text">Most common crimes in {{year1}}</p>
            <ul>
            {{distributionYear1}}
            </ul>
        </div>
        <div class="tab-pane fade" id="year3{{card-id}}" role="tabpanel" aria-labelledby="year3-tab">
            <h5> {{countyName}} - {{countyType}} </h5>
            <p class="card-title">CR = <span style="color: {{crimeRateYear2Color}} ;"> {{crimeRateYear2}} </span></p>
            <p class="card-text">Most common crimes in {{year2}}</p>
            <ul>
            {{distributionYear2}}
            </ul>
        </div>
    </div>
</div>
`;
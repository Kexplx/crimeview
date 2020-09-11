<a href="https://github.com/kexplx/crimeview/actions" alt="GitHub Actions">
 <img src="https://github.com/kexplx/crimeview/workflows/CI/badge.svg" />
</a>
<a href="https://kexplx.github.io/crimeview/" alt="GitHub Pages Deployment">
  <img src="https://img.shields.io/badge/Live-GitHub Pages-2980b9" />
</a>

# Landkreiskriminalität | Crimeview

This app analyses a route based on a Polygon, Line or Radius for 1 - 3 german cities and displays all german counties (<i>de: Landkreise</i>) with their respective crime rate.

<i>Crime rate</i> == Committed crimes per 100.000 inhabitants.

<p align="center">
  <img src="docs/map-sample-2.png?raw=true" title="Sample Route">
</p>

## Data sources 💗

<ul>
    <li><a target_blank href="https://public.opendatasoft.com/explore/dataset/landkreise-in-germany/table/">Opendatasoft</a> - Geojson of counties</li>
    <li><a target_blank href="https://cloud.google.com/maps-platform/places">Google Places</a> - City predictions and details</li>
    <li><a target_blank href="https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/pks_node.html">Bundeskriminalamt</a> - County crime statistics</li>
</ul>

## Inspiration

The <a href="https://fau.de">AMOS</a> course @ <a href="https://fau.de">FAU</a>

## License

Copyright 2020 Oscar Rosner  
Copyright 2020 Sebastian Geitner

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

SPDX-License-Identifier: AGPL-3.0-only

<a href="https://github.com/kexplx/crimeview/actions" alt="GitHub Actions">
 <img src="https://github.com/kexplx/crimeview/workflows/CI/badge.svg" />
</a>
<a href="https://kexplx.github.io/crimeview/" alt="GitHub Pages Deployment">
  <img src="https://img.shields.io/badge/Live-GitHub Pages-2980b9" />
</a>

# Crimeview | Stadt- Landkreiskriminalität

This app analyses a route based on a Polygon, Line or Radius for 1 - 3 german cities and displays all districts <i>(de: Stadt- Landkreise)</i> with their respective crime rate on it.

<i>Crime rate</i> == Number of offences per 100.000 inhabitants.

<p align="center">
  <img src="docs/map-sample-3.png?raw=true" title="Sample Route">
</p>

## Data sources

<ul>
    <li><a target_blank href="https://public.opendatasoft.com/explore/dataset/georef-germany-kreis/information">Opendatasoft</a><strong> - Geojson of districts 💗</strong></li>
    <li><a target_blank href="https://cloud.google.com/maps-platform/places">Google Places</a> - City predictions and details</li>
    <li><a target_blank href="https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/pks_node.html">Bundeskriminalamt</a> - District crime statistics</li>
</ul>

## Idea
The idea for Crimeview comes from the <a href="https://oss.cs.fau.de/">Professorship of open source</a> and it's <a href="https://oss.cs.fau.de/teaching/specific/amse/">AMSE</a> course @ <a href="https://www.fau.eu/">FAU</a>.
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

<?php

// Einzelne Werte im County getrennt mit ';' 
// Ganze County-Zeilen getrennt mit 'SPLIT'
// {kreis-schlüssel};{year};{crimerate};{crimetype1};{crimetype1-count};{crimetype2};{crimetype2-count};{crimetype3};{crimetype3-count};{crimetype4};{crimetype4-count};{year-1};...;{year - 2};..SPLIT{kreis-schlüssel}...

$s = file_get_contents("crime-db");

$rows = explode("SPLIT", $s);
var_dump(explode(";", $rows[0]));

// array(28) {
//     [0] =>
//     string(4) "1001"
//     [1] =>
//     string(4) "2018"
//     [2] =>
//     string(74) "Diebstahl ohne erschwerende Umstände §§ 242, 247, 248a-c StGB und zwar:"
//     [3] =>
//     string(4) "2042"
//     [4] =>
//     string(21) "Straßenkriminalität"
//     [5] =>
//     string(4) "1804"
//     [6] =>
//     string(69) "Diebstahl unter erschwerenden Umständen §§ 243-244a StGB und zwar:"     
//     [7] =>
//     string(4) "1413"
//     [8] =>
//     string(24) "Einfacher Ladendiebstahl"
//     [9] =>
//     string(3) "909"
//     [10] =>
//     string(4) "2017"
//     [11] =>
//     string(74) "Diebstahl ohne erschwerende Umstände §§ 242, 247, 248a-c StGB und zwar:"
//     [12] =>
//     string(4) "2226"
//     [13] =>
//     string(21) "Straßenkriminalität"
//     [14] =>
//     string(4) "2027"
//     [15] =>
//     string(69) "Diebstahl unter erschwerenden Umständen §§ 243-244a StGB und zwar:"
//     [16] =>
//     string(4) "1693"
//     [17] =>
//     string(54) "Betrug §§ 263, 263a, 264, 264a, 265, 265a, 265b StGB"
//     [18] =>
//     string(4) "1125"
//     [19] =>
//     string(4) "2016"
//     [20] =>
//     string(21) "Straßenkriminalität"
//     [21] =>
//     string(4) "2444"
//     [22] =>
//     string(74) "Diebstahl ohne erschwerende Umstände §§ 242, 247, 248a-c StGB und zwar:"
//     [23] =>
//     string(4) "2327"
//     [24] =>
//     string(69) "Diebstahl unter erschwerenden Umständen §§ 243-244a StGB und zwar:"
//     [25] =>
//     string(4) "1882"
//     [26] =>
//     string(36) "Sachbeschädigung §§ 303-305a StGB"
//     [27] =>
//     string(4) "1254"
//   }

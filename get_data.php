<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
header('Content-Type: application/json');

$page = file_get_contents('http://radio.elbinario.net/api/live-info/'); 	
		
$data = json_decode($page);
$current = $data->currentShow;
$current = $current[0];

$current_media = $data->current;

$next = $data->nextShow;
$next = $next[0];

$actual = substr($current->start_timestamp, 10,6) . " - ". substr($current->end_timestamp, 10,6) ." => " . $current->name;
$proximo = substr($next->start_timestamp, 10,6) . " - ". substr($next->end_timestamp, 10,6) ." => " . $next->name;

$actualizar = substr($data->current->ends, 0, 19);
if ( strtotime(substr($data->current->ends, 0, 19)) < strtotime(substr($next->start_timestamp, 0, 19))) {
	$actualizar = substr($next->start_timestamp, 0, 19);
}

$salida = array( 
	"hora" => $data->schedulerTime,
	"actualizar" => $actualizar,
	"actual" => $actual,
	"emitiendo" => $current_media->name,
	"proximo" => $proximo
);

echo json_encode($salida);
exit();
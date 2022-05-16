<?php

declare(strict_types=1);

spl_autoload_register(function (string $class_name) {
	$filename = "classes/" . $class_name . ".php";
	require_once($filename);
});

header('Access-Control-Allow-Headers: Overwrite, Destination, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control');
if (isset($_SERVER['HTTP_ORIGIN'])) {
	header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	header('Access-Control-Allow-Methods: GET, POST');
	header('Access-Control-Allow-Credentials: true');
	header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

$url = substr($_SERVER['REQUEST_URI'], 8);
Router::route($url);

<?php
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
ini_set('display_errors', '0');

require_once 'autoload.php';

use App\Serializer;
use App\Encoder\CsvEncoder;
use App\Encoder\JsonEncoder;
use App\Encoder\YamlEncoder;

$input = $_POST['input'] ?? $_COOKIE['last_input'] ?? '';
$format_in = $_POST['format_in'] ?? $_COOKIE['last_format_in'] ?? 'CSV';
$format_out = $_POST['format_out'] ?? $_COOKIE['last_format_out'] ?? 'JSON';
$output = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $serializer = new Serializer();
    $serializer->addEncoder(new CsvEncoder());
    $serializer->addEncoder(new JsonEncoder());
    $serializer->addEncoder(new YamlEncoder());

    $output = $serializer->convert($input, $format_in, $format_out);

    setcookie('last_input', $input, time() + (86400 * 30));
    setcookie('last_format_in', $format_in, time() + (86400 * 30));
    setcookie('last_format_out', $format_out, time() + (86400 * 30));
}

include 'templates/layout.php';
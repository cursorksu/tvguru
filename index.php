<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/views/data/data.php';

$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2)[0];

foreach ($pages as $page) {
  if ($request_uri === $page->href) {
    require $_SERVER['DOCUMENT_ROOT'] . $page->path;
    break;
  } elseif ($request_uri === '/') {
    require $_SERVER['DOCUMENT_ROOT'] . '/views/main.php';
    break;
  }
}

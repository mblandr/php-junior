<?php

class Router
{
	public static function route($url)
	{
		$manager = new ProductsManager('localhost', 'lebalexp_test', 'lebalexp_test', 'L(v0;3bm@2r&');
		// $manager = new ProductsManager('localhost', 'test_task', 'root', '');
		if ($url == '') {
			$manager->get_all();
		} else if ($url == '/add-product' && ($_SERVER['REQUEST_METHOD'] === 'POST')) {
			$manager->add();
		} else if ($url == '/del' && ($_SERVER['REQUEST_METHOD'] === 'POST')) {
			$manager->del();
		} else {
			die(json_encode([
				'error' => 'Not implemented request '. $url
			]));
		}
	}
}

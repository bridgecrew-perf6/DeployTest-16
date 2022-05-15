<?php

namespace App;

use MF\Init\Bootstrap;

class Route extends Bootstrap {

	protected function initRoutes() {

		$routes['home'] = array(
			// 'route' => '/[i:id]', exemplo com parâmetros
			'route' => '/',
			'controller' => 'indexController',
			'action' => 'index'
		);

		$routes['registrar'] = array(
			'route' => '/registrar',
			'controller' => 'indexController',
			'action' => 'registrar'
		);

		$routes['agradecimento'] = array(
			'route' => '/agradecimento',
			'controller' => 'indexController',
			'action' => 'agradecimento'
		);

		$this->setRoutes($routes);
	}

}

?>
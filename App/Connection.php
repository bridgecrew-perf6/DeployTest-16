<?php

namespace App;

class Connection {

	public static function getDb() {
		try {
			// Aponta o host para o nome do container do banco
			$conn = new \PDO(
				"pgsql:host=app_postgres;port=5432;dbname=ocai_questionario",
				"ehweyand",
				"ehweyand" 
			);

			return $conn;

		} catch (\PDOException $e) {
			//.. tratar de alguma forma ..//
		}
	}
}

?>
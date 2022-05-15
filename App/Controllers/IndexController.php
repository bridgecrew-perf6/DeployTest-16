<?php

namespace App\Controllers;

use MF\Controller\Action;
use MF\Model\Container;

use \DateTime;
use \DateTimeZone;

class IndexController extends Action {

	public function index() {
		$this->render('index');
	}

	public function agradecimento() {
		// Para enviar um parâmetro para a view
		//$this->view->erroCadastro = true;
		$this->render('agradecimento');
	}


	public function registrar() {
		// Verifica se enviou algo
		if(!empty($_POST)) {

			$registro = Container::getModel('RegistroQuestao');
			// Populando o objeto
			$registro->__set('nome', $_POST['nome']);
			$registro->__set('email', $_POST['email']);
			$registro->__set('pont_cla', $_POST['pont_cla']);
			$registro->__set('pont_ino', $_POST['pont_ino']);
			$registro->__set('pont_res', $_POST['pont_res']);
			$registro->__set('pont_hie', $_POST['pont_hie']);
			$registro->__set('tipo_pesquisa', $_POST['tipo_pesquisa']);
			// Inserir o timestamp atual - momento do registro
			$date = new DateTime("now", new DateTimeZone('America/Sao_Paulo') );
			$registro->__set('datareg', $date->format('Y-m-d H:i:s'));
			$registro->salvar();
			//Retorna um valor confirmando a inserção com sucesso para o front (Via ajax)
			// .....
			echo "1";

		} else {
			$output = "Ocorreu algum erro no registro";
			echo $output;
		}

		// echo json_encode($output);
	}

}

?>
<?php

namespace App\Models;

use MF\Model\Model;


class RegistroQuestao extends Model {

	private $id;
	private $nome;
	private $email;
	private $pont_cla;
    private $pont_ino;
    private $pont_res;
    private $pont_hie;
    private $datareg;

	public function __get($atributo) {
		return $this->$atributo;
	}

	public function __set($atributo, $valor) {
		$this->$atributo = $valor;
	}

    public function salvar() {
        $query = "insert into registro_questao(nome, email, pont_cla, pont_ino, pont_res, pont_hie, tipo_pesquisa, datareg)values(:nome, :email, :pont_cla, :pont_ino, :pont_res, :pont_hie, :tipo_pesquisa, :datareg)";

        $stmt = $this->db->prepare($query);
        // Define os valores
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->bindValue(':email', $this->__get('email'));
        $stmt->bindValue(':pont_cla', $this->__get('pont_cla'));
        $stmt->bindValue(':pont_ino', $this->__get('pont_ino'));
        $stmt->bindValue(':pont_res', $this->__get('pont_res'));
        $stmt->bindValue(':pont_hie', $this->__get('pont_hie'));
        $stmt->bindValue(':tipo_pesquisa', $this->__get('tipo_pesquisa'));
        $stmt->bindValue(':datareg', $this->__get('datareg'));

        $stmt->execute();

        return $this;
    }

}

?>
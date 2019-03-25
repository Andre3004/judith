package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum TipoPessoa
{
	FAVORECIDO, //0
	PAGADOR;	//1
}

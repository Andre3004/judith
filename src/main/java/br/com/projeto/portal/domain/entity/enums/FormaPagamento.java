package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum FormaPagamento
{
	FIXA,		//0
	PARCELADO;	//1
}

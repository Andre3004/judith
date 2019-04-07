package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum TipoLancamento
{
	RECEITA,		//0
	DESPESA,	   	//1
	TRANSFERENCIA; 	//2
}

package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum SituacaoLancamento
{
	LIQUIDADO, 		//0
	PENDENTE;		//1
}

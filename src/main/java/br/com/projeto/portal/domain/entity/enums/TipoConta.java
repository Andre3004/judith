package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum TipoConta
{
	CONTROLE_INTERNO,   //0
	CARTAO_CREDITO,		//1
	CONTA_CORRENTE, 	//2
	POUPANCA;			//3
}

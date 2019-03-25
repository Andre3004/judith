package br.com.projeto.portal.domain.entity.enums;

import org.directwebremoting.annotations.DataTransferObject;

@DataTransferObject(type = "enum")
public enum Periodo
{
	SEGUNDO, 	//0
	MINUTO, 	//1
	HORA,		//2
	DIA,		//3
	SEMANA, 	//4
	MES,		//5
	ANO;		//6

}

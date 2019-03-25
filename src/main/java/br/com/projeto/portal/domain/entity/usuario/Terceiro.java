package br.com.projeto.portal.domain.entity.usuario;

import javax.persistence.Column;
import javax.persistence.Entity;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.enums.TipoPessoa;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Terceiro")
public class Terceiro extends AbstractEntity
{


	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@Column(unique = true)
	private String nome;

	private TipoPessoa tipo;
}

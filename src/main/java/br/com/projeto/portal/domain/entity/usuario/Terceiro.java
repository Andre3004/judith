package br.com.projeto.portal.domain.entity.usuario;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
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

	@NotNull
	private String nome;

	@NotNull
	private String tipoPessoa;

	private String email;

	private String telefone;

	@NotNull
	@Column(unique = true)
	private String documento;

	private String nomeContato;

	@ManyToOne
	private Endereco endereco;

	private String observacao;
}

package br.com.projeto.portal.domain.entity.usuario;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Endereco")
public class Endereco extends AbstractEntity
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotNull
	private String bairro;

	private String complemento;

	@NotNull
	private String cidade;

	private String cep;

	@NotNull
	private Integer numero;
	/*-------------------------------------------------------------------
	 * 		 					CONSTRUCTORS
	 *-------------------------------------------------------------------*/



	/*-------------------------------------------------------------------
	 *							BEHAVIORS
	 *-------------------------------------------------------------------*/



	/*-------------------------------------------------------------------
	 *						EXCEPTIONS
	 *-------------------------------------------------------------------*/
}

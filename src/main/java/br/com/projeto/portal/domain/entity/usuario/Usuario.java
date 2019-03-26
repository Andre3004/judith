package br.com.projeto.portal.domain.entity.usuario;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.com.projeto.portal.domain.entity.conta.Conta;
import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.Param;

import br.com.eits.common.domain.entity.AbstractEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 */
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Usuario")
public class Usuario extends AbstractEntity implements Serializable
{


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@Column(unique = true)
	private String nome;

	private String cpf;

	private String email;

	private String senha;

	private String telefone;

	@ManyToOne
	private Endereco endereco;

//	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "artigo", orphanRemoval = true)
	@OneToMany(mappedBy = "usuario")
	private List<Conta> contas = new ArrayList<>();
	/*-------------------------------------------------------------------
	 * 		 					CONSTRUCTORS
	 *-------------------------------------------------------------------*/

	

	/*-------------------------------------------------------------------
	 *							BEHAVIORS
	 *-------------------------------------------------------------------*/

	
	
	/*-------------------------------------------------------------------
	 *						EXCEPTIONS
	 *-------------------------------------------------------------------*/


	
	/*-------------------------------------------------------------------
	 *						GETTERS AND SETTERS
	 *-------------------------------------------------------------------*/
	

}

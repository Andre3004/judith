package br.com.projeto.portal.domain.entity.usuario;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import br.com.projeto.portal.domain.entity.conta.Conta;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.Param;

import br.com.eits.common.domain.entity.AbstractEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 
 */
@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Usuario")
public class Usuario extends AbstractEntity implements UserDetails
{


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotNull
	private String nome;

	@NotNull
	@Column(unique = true)
	private String cpf;

	@NotNull
	private String email;

	@NotNull
	private String senha;

	private String telefone;

	@NotNull
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

	/**
	 * Tratamento para quando a conta estiver excluída (é o mesmo que como se estivesse expirada)
	 */
	@Override
	@Transient
	@JsonIgnore
	public boolean isAccountNonExpired()
	{
		return true;
	}

	/**
	 * Tratamento para quando a conta estiver bloqueada, a data de hoje deve estar entra a data de desbloqueio e a data de bloqueio
	 */
	@Override
	@Transient
	@JsonIgnore
	public boolean isAccountNonLocked()
	{
		return true;
	}

	/**
	 * As credenciais estão expiradas quando o usuário foi assinalado para dever alterar a senha (alterarSenha ==true), ou a data de hoje for posterior a data de expiração da senha
	 */
	@Override
	@Transient
	@JsonIgnore
	public boolean isCredentialsNonExpired()
	{
		return true;
	}

	/**
	 *
	 */
	@Override
	@Transient
	@JsonIgnore
	public boolean isEnabled()
	{
		return true;
	}

	/*
	 * (non-Javadoc)
	 * @see
	 * org.springframework.security.core.userdetails.UserDetails#getPassword()
	 */
	@Override
	@Transient
	@JsonIgnore
	public String getPassword()
	{
		return this.senha;
	}

	/*
	 * (non-Javadoc)
	 * @see
	 * org.springframework.security.core.userdetails.UserDetails#getUsername()
	 */
	@Override
	@Transient
	@JsonIgnore
	public String getUsername()
	{
		return this.email;
	}

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetails#getAuthorities()
	 */
	@Override
	@Transient
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities()
	{
		return new HashSet<>();

	}

	
	
	/*-------------------------------------------------------------------
	 *						EXCEPTIONS
	 *-------------------------------------------------------------------*/


	
	/*-------------------------------------------------------------------
	 *						GETTERS AND SETTERS
	 *-------------------------------------------------------------------*/
	

}

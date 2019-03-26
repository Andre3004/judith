package br.com.projeto.portal.domain.entity.conta;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.entity.usuario.Usuario;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Categoria")
public class Conta extends AbstractEntity
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/


	private String nome;

	private BigDecimal saldo;

	@NotNull
	@ManyToOne
	private Usuario usuario;

	@OneToMany(mappedBy = "conta")
	private List<Lancamento> lancamentos = new ArrayList<Lancamento>();
}

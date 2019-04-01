package br.com.projeto.portal.domain.entity.conta;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.enums.TipoConta;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.entity.usuario.Usuario;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Categoria")
@Table(
		uniqueConstraints = {@UniqueConstraint(columnNames = {"nome", "tipo"})}
)
public class Conta extends AbstractEntity
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotNull
	private String nome;

	@NotNull
	private BigDecimal saldo = new BigDecimal(0.0 );

	@NotNull
	private TipoConta tipo;

	@ManyToOne
	private Banco banco;

	private LocalDateTime dataUltAltSaldo;

	@NotNull
	@ManyToOne
	private Usuario usuario;


	@OneToMany(mappedBy = "conta")
	private List<Lancamento> lancamentos = new ArrayList<Lancamento>();
}

package br.com.projeto.portal.domain.entity.conta;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.enums.SituacaoLancamento;
import br.com.projeto.portal.domain.entity.enums.TipoConta;
import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.entity.usuario.Usuario;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Categoria")
public class Conta extends AbstractEntity
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotBlank
	@Column(unique = true)
	private String nome;

	private Double saldoInicial;

	@NotNull
	private Double saldo;

	@NotNull
	private TipoConta tipo;

	@ManyToOne
	private Banco banco;

	private LocalDateTime dataUltAltSaldo;

	@ManyToOne
	private Usuario usuario;

	private Boolean isDisabled = false;

	@OneToMany(mappedBy = "conta", fetch = FetchType.EAGER)
	private List<Lancamento> lancamentos = new ArrayList<Lancamento>();

	private Double transferencias;

	public Conta(){
		this.saldoInicial = 0.0;
		this.saldo = 0.0;
		this.transferencias = 0.0;
	}
}

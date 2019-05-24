package br.com.projeto.portal.domain.entity.lancamento;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.conta.Banco;
import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.entity.enums.FormaPagamento;
import br.com.projeto.portal.domain.entity.enums.Periodo;
import br.com.projeto.portal.domain.entity.enums.SituacaoLancamento;
import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.usuario.Terceiro;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;

@Data
@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"categoria", "lancamentosRecorrentes"})
@DataTransferObject(javascript = "Lancamento")
public class Lancamento extends AbstractEntity implements Serializable
{
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotNull
	@ManyToOne
	private Categoria categoria;

	@NotNull
	@ManyToOne
	private Conta conta;

	@NotNull
	private TipoLancamento tipo;

	@NotNull
	private String descricao;

	@NotNull
	private LocalDate dataVencimento;

	@NotNull
	private BigDecimal valor;

	@NotNull
	private SituacaoLancamento situacaoLancamento;

	@NotNull
	private Boolean baixaAutomatica;

	private LocalDateTime dataPagamento;

	private BigDecimal valorPago;

	@ManyToOne
	private Conta contaDestino;

	@NotNull
	private Boolean repetir;

	private FormaPagamento formaPagamento;

	private Integer parcelasTotal;

	private Integer parcelasPagas;

	/**
	 * 30 dias, 1 mes, 1 ano
	 */
	private Integer quantidadePeriodo;

	@ManyToOne
	private Terceiro favorecidoPagador;

	private Periodo periodoPagamento;

	private Integer quantidadeRepeticaoRecorrencia;

	@NotNull
	private Periodo periodoNotificacao;

	@NotNull
	private Integer quantidadeNotificacaoVencimento;

	private Boolean indefinivamente;

	private Boolean desativarNotificacao;

	private Boolean haveNotification;

	private Double saldoFinal = 0.0;

	@ManyToOne
	private Lancamento lancamentoPai;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "lancamentoPai")
	private List<Lancamento> lancamentosRecorrentes = new ArrayList<Lancamento>();

	/*-------------------------------------------------------------------
	 * 		 					CONSTRUCTORS
	 *-------------------------------------------------------------------*/

	public Lancamento(){}

	public Lancamento( Conta conta, TipoLancamento tipo, SituacaoLancamento situacaoLancamento, Lancamento lancamento )
	{
		this.categoria = lancamento.categoria;
		this.conta = conta;
		this.tipo = tipo;
		this.descricao = lancamento.descricao;
		this.dataVencimento = lancamento.dataVencimento;
		this.valor = lancamento.valor;
		this.valorPago = lancamento.valorPago;
		this.situacaoLancamento = situacaoLancamento;
		this.baixaAutomatica = lancamento.baixaAutomatica;
		this.repetir = lancamento.repetir;
		this.periodoNotificacao = lancamento.periodoNotificacao;
		this.quantidadeNotificacaoVencimento = lancamento.quantidadeNotificacaoVencimento;
		this.lancamentoPai = lancamento;
	}

	public Lancamento( Conta conta, TipoLancamento tipo, SituacaoLancamento situacaoLancamento, Lancamento lancamento, LocalDate dataVencimento, Integer parcelasPagas )
	{
		this.categoria = lancamento.categoria;
		this.conta = conta;
		this.tipo = tipo;
		this.descricao = lancamento.descricao;
		this.dataVencimento = dataVencimento;
		this.valor = lancamento.valor;
		this.valorPago = lancamento.valorPago;
		this.situacaoLancamento = situacaoLancamento;
		this.baixaAutomatica = lancamento.baixaAutomatica;
		this.repetir = lancamento.repetir;
		this.periodoNotificacao = lancamento.periodoNotificacao;
		this.quantidadeNotificacaoVencimento = lancamento.quantidadeNotificacaoVencimento;
		this.lancamentoPai = lancamento;
		this.favorecidoPagador = lancamento.getFavorecidoPagador();
		this.quantidadeRepeticaoRecorrencia = lancamento.getQuantidadeRepeticaoRecorrencia();
		this.periodoPagamento = lancamento.getPeriodoPagamento();
		this.parcelasPagas = parcelasPagas;
		this.parcelasTotal = lancamento.getParcelasTotal();
		this.periodoNotificacao = lancamento.getPeriodoNotificacao();
		this.quantidadeNotificacaoVencimento = lancamento.getQuantidadeNotificacaoVencimento();
		this.quantidadePeriodo = lancamento.getQuantidadePeriodo();
		this.haveNotification = lancamento.getHaveNotification();
	}
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

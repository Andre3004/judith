package br.com.projeto.portal.domain.entity.lancamento;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
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
@EqualsAndHashCode(callSuper = true)
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

	@NotNull
	private LocalDateTime dataPagamento;

	private BigDecimal valorPago;

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
	@NotNull
	private Terceiro favorecidoPagador;

	private Periodo periodoPagamento;

	private Integer quantidadeRepeticaoRecorrencia;

	@NotNull
	private Periodo periodoNotificacao;

	@NotNull
	private Integer quantidadeNotificacaoVencimento;

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

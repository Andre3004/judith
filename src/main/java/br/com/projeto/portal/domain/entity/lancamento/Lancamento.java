package br.com.projeto.portal.domain.entity.lancamento;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
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

	private TipoLancamento tipo;

	private SituacaoLancamento situacaoLancamento;

	private BigDecimal valor;

	private LocalDateTime dataPagamento;

	private String descricao;

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

	private Periodo periodoNotificacao;

	private Integer quantidadeNotificacaoVencimento;

	@NotNull
	@ManyToOne
	private Categoria categoria;
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

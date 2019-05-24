package br.com.projeto.portal.domain.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import br.com.projeto.portal.application.security.ContextHolder;
import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.entity.enums.Periodo;
import br.com.projeto.portal.domain.entity.enums.SituacaoLancamento;
import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.lancamento.Categoria;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.entity.usuario.Terceiro;
import br.com.projeto.portal.domain.repository.ICategoriaRepository;
import br.com.projeto.portal.domain.repository.IContaRepository;
import br.com.projeto.portal.domain.repository.ILancamentoRepository;
import br.com.projeto.portal.domain.repository.ITerceiroRepository;
import org.apache.tomcat.jni.Local;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
@RemoteProxy
@Transactional
public class LancamentoService
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@Autowired
	private ICategoriaRepository categoriaRepository;

	@Autowired
	private ILancamentoRepository lancamentoRepository;

	@Autowired
	private ITerceiroRepository terceiroRepository;

	@Autowired
	private IContaRepository contaRepository;


	/*-------------------------------------------------------------------
	 *				 		     SERVICES
	 *-------------------------------------------------------------------*/

	/**
	 * Método para inserir um lancamento
	 *
	 * @param lancamento
	 * @return
	 */
	public Lancamento insertLancamento( Lancamento lancamento, List<Long> idsSubRemoved )
	{


		Assert.isTrue( lancamento.getCategoria() != null, "O campo categoria deve ser preenchido." );
		Assert.isTrue( lancamento.getCategoria().getSubCategorias() != null, "Essa categoria não possui sub categorias" );
		Assert.isTrue( lancamento
				.getCategoria().getSubCategorias().stream().filter( subCategoria -> subCategoria.getIsSelected() != null && subCategoria.getIsSelected() ).count() > 0, "O campo sub categoria deve ser selecionado." );

		lancamento.getCategoria().getSubCategorias().forEach( categoria -> this.categoriaRepository.saveAndFlush( categoria ) );

		Long subCategoriaSelectedId = lancamento
				.getCategoria().getSubCategorias().stream().filter( subCategoria -> subCategoria.getIsSelected() != null && subCategoria.getIsSelected() )
				.collect( Collectors.toList() ).get( 0 ).getId();

		lancamento.setCategoria( this.categoriaRepository.findOne( subCategoriaSelectedId ) );

		lancamento.setBaixaAutomatica( lancamento.getBaixaAutomatica() != null ? lancamento.getBaixaAutomatica() : false );
		lancamento.setRepetir( lancamento.getRepetir() != null ? lancamento.getRepetir() : false );
		lancamento.setPeriodoNotificacao( lancamento.getPeriodoNotificacao() != null ? lancamento.getPeriodoNotificacao() : Periodo.DIA );
		lancamento.setQuantidadeNotificacaoVencimento( lancamento.getQuantidadeNotificacaoVencimento() != null ? lancamento.getQuantidadeNotificacaoVencimento() : 0 );


		Lancamento lancamentoSaved = this.lancamentoRepository.saveAndFlush( lancamento );

		//FIXME ajustar para descontar certo e verificar o valor da receita e despesa
		if ( lancamentoSaved.getTipo().equals( TipoLancamento.TRANSFERENCIA ) )
		{
			Conta contaOrigem = this.contaRepository.findOne( lancamento.getConta().getId() );
			Conta contaDestino = this.contaRepository.findOne( lancamento.getContaDestino().getId() );

			contaDestino.setTransferencias( contaDestino.getTransferencias() + lancamento.getValorPago().doubleValue() );
			contaOrigem.setTransferencias( contaOrigem.getTransferencias() - lancamento.getValorPago().doubleValue() );

			this.contaRepository.saveAndFlush( contaOrigem );
			this.contaRepository.saveAndFlush( contaDestino );
		}

		//Lancamento recorrentes
		if ( lancamento.getRepetir() )
		{

			LocalDate dataVencimento = lancamento.getDataVencimento();
			Integer parcelasPagas = lancamento.getParcelasPagas();
			for ( int i = 0; i < lancamento.getParcelasTotal() - lancamento.getParcelasPagas(); i++ )
			{
				if ( lancamento.getPeriodoPagamento() != null )
				{
					switch ( lancamento.getPeriodoPagamento() )
					{
						case DIA:
						{
							dataVencimento = dataVencimento.plusDays( lancamento.getQuantidadePeriodo() );
						}
						case MES:
						{
							dataVencimento = dataVencimento.plusMonths( lancamento.getQuantidadePeriodo() );
						}
						case ANO:
						{
							dataVencimento = dataVencimento.plusYears( lancamento.getQuantidadePeriodo() );
						}
					}
					parcelasPagas += 1;
				}

				Lancamento lancamentoDespesa = new Lancamento( lancamentoSaved.getConta(), lancamento.getTipo(), SituacaoLancamento.PENDENTE, lancamentoSaved, dataVencimento, parcelasPagas );
				lancamento.setLancamentoPai( lancamentoSaved );
				this.lancamentoRepository.saveAndFlush( lancamentoDespesa );
			}
		}


		for ( Long removedId : idsSubRemoved )
		{
			int count = this.lancamentoRepository.countByCategoriaId( removedId );

			Assert.isTrue( count == 0, "Não é possível excluir a sub categoria " + this.categoriaRepository.findOne( removedId ).getNome() + " pois a mesma está vinculado á outro lançamento." );
			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}

		return lancamentoSaved;
	}

	/**
	 * Método para atualizar um lancamento
	 *
	 * @param lancamento
	 * @return
	 */
	public Lancamento updateLancamento( Lancamento lancamento )
	{
		return this.lancamentoRepository.save( this.lancamentoRepository.save( lancamento ) );
	}

	/**
	 * Método para exlcuir um lancamento
	 *
	 * @param id
	 */
	public void deleteLancamento( long id )
	{
		Lancamento lancamento = this.findLancamentoById( id );
		if ( lancamento.getTipo().equals( TipoLancamento.TRANSFERENCIA ) )
		{
			lancamento.getConta().setTransferencias( lancamento.getConta().getTransferencias() + lancamento.getValorPago().doubleValue() );
			lancamento.getContaDestino().setTransferencias( lancamento.getContaDestino().getTransferencias() - lancamento.getValorPago().doubleValue()  );
		}

		this.lancamentoRepository.delete( id );
		this.lancamentoRepository.flush();
	}

	/**
	 * Método para buscar um lancamento pelo id
	 *
	 * @param id
	 * @return
	 */
	public Lancamento findLancamentoById( long id )
	{
		return this.lancamentoRepository.findLancamentoById( id );
	}

	public List<Lancamento> listLancamentoByFilters( String descricao, TipoLancamento tipo, Long contaId, LocalDate dataInicial, LocalDate dataFinal )
	{
		LocalDateTime newDataInicial = null;
		LocalDateTime newDataFinal = null;
		if ( dataInicial != null )
		{
			newDataInicial = LocalDateTime.of( dataInicial, LocalTime.MIN );
		}
		if ( dataFinal != null )
		{
			newDataFinal = LocalDateTime.of( dataFinal, LocalTime.MAX );
		}



		return this.lancamentoRepository.listByFilters( descricao, tipo, contaId, ContextHolder.getAuthenticatedUser().getId(), newDataInicial, newDataFinal );
	}


	public List<Lancamento> listLancamentoProximosAvencer(   Long dias )
	{
		LocalDate newData = LocalDate.now(ZoneId.systemDefault());
		newData = newData.plusDays( dias +1 );
		return this.lancamentoRepository.listProximosVencer(SituacaoLancamento.PENDENTE, ContextHolder.getAuthenticatedUser().getId(), newData);
	}


	public List<Terceiro> listAllTerceiros()
	{
		return this.terceiroRepository.findAll();
	}

	public List<Lancamento> findLancamentoByContaDestinoId(Long contaId)
	{
		return this.lancamentoRepository.listByContaDestinoIdAndTipoEquals( contaId, TipoLancamento.TRANSFERENCIA, SituacaoLancamento.LIQUIDADO);
	}

	/*-------------------------------------------------------------------
	 *				 		     NOTIFICAÇÕES
	 *-------------------------------------------------------------------*/

	public List<Lancamento> listLancamentosPendentesToNotificacao()
	{
		List<Lancamento> lancamentosPendentes = this.lancamentoRepository.listLancamentosToNotification( SituacaoLancamento.PENDENTE, ContextHolder.getAuthenticatedUser().getId());
		List<Lancamento> lancamentosNotificacao = new ArrayList<>(  );

		for ( Lancamento lancamentoPendente : lancamentosPendentes )
		{
			if ( lancamentoPendente.getPeriodoNotificacao() != null && lancamentoPendente.getHaveNotification() != null  && lancamentoPendente.getHaveNotification())
			{
				LocalDateTime dataAtual = LocalDateTime.now( ZoneId.of("America/Sao_Paulo"));
				switch ( lancamentoPendente.getPeriodoNotificacao() )
				{
					case DIA:
					{
						dataAtual = dataAtual.plusDays( lancamentoPendente.getQuantidadeNotificacaoVencimento() );
					}
					case MES:
					{
						dataAtual = dataAtual.plusMonths( lancamentoPendente.getQuantidadeNotificacaoVencimento() );
					}
					case ANO:
					{
						dataAtual = dataAtual.plusYears( lancamentoPendente.getQuantidadeNotificacaoVencimento() );
					}
				}

				if(dataAtual.isAfter( lancamentoPendente.getDataVencimento().atTime( 00, 00 ) )
						|| dataAtual.isEqual( lancamentoPendente.getDataVencimento().atTime( 00, 00 ) ))
				{
					lancamentosNotificacao.add( lancamentoPendente );
				}
			}

		}
		return lancamentosNotificacao;
	}

	/*-------------------------------------------------------------------
	 *				 		     CATEGORIAS
	 *-------------------------------------------------------------------*/


	public List<Categoria> listAllCategorias()
	{
		return this.categoriaRepository.findAll().stream()
				.filter( categoria -> categoria.getCategoriaPai() == null )
				.collect( Collectors.toList() );
	}

	public void insertAndRemoveAllCategorias( List<Categoria> categorias, List<Long> idsRemoved, List<Long> idsSubRemoved )
	{

		for ( Long removedId : idsSubRemoved )
		{
			int count = this.lancamentoRepository.countByCategoriaId( removedId );
			Assert.isTrue( count == 0, "Não é possível excluir a sub categoria " + this.categoriaRepository.findOne( removedId ).getNome() + " pois a mesma está vinculado á um ou mais lançamentos." );

			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}


		for ( Long removedId : idsRemoved )
		{
			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}

		if ( categorias != null && categorias.size() > 0 )
		{
			categorias.forEach( categoria -> {

				Categoria categoriaSaved = this.categoriaRepository.saveAndFlush( categoria );

				categoria.getSubCategorias().forEach( subCategoria -> {
					subCategoria.setCategoriaPai( categoriaSaved );
					this.categoriaRepository.saveAndFlush( subCategoria );
				} );

			} );
		}

	}

}

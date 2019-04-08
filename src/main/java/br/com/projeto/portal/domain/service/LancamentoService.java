package br.com.projeto.portal.domain.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import br.com.projeto.portal.domain.entity.enums.Periodo;
import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.lancamento.Categoria;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.entity.usuario.Terceiro;
import br.com.projeto.portal.domain.repository.ICategoriaRepository;
import br.com.projeto.portal.domain.repository.ILancamentoRepository;
import br.com.projeto.portal.domain.repository.ITerceiroRepository;
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


	/*-------------------------------------------------------------------
	 *				 		     SERVICES
	 *-------------------------------------------------------------------*/

	/**
	 * Método para inserir um lancamento
	 * @param lancamento
	 * @return
	 */
	public Lancamento insertLancamento( Lancamento lancamento, List<Long> idsSubRemoved)
	{


		Assert.isTrue( lancamento.getCategoria() != null, "O campo categoria deve ser preenchido." );
		Assert.isTrue( lancamento.getCategoria().getSubCategorias() != null, "Essa categoria não possui sub categorias" );
		Assert.isTrue( lancamento
				.getCategoria().getSubCategorias().stream().filter( subCategoria -> subCategoria.getIsSelected() != null && subCategoria.getIsSelected() ).count() > 0, "O campo sub categoria deve ser selecionado." );

		lancamento.getCategoria().getSubCategorias().forEach( categoria -> this.categoriaRepository.saveAndFlush( categoria ));

		Long subCategoriaSelectedId = lancamento
											.getCategoria().getSubCategorias().stream().filter( subCategoria -> subCategoria.getIsSelected() != null && subCategoria.getIsSelected() )
											.collect( Collectors.toList() ).get( 0 ).getId();

		lancamento.setCategoria( this.categoriaRepository.findOne( subCategoriaSelectedId ) );

		lancamento.setBaixaAutomatica( false );
		lancamento.setRepetir( false );
		lancamento.setPeriodoNotificacao( Periodo.DIA );
		lancamento.setQuantidadeNotificacaoVencimento( 0 );

		Lancamento lancamentoSaved = this.lancamentoRepository.saveAndFlush( lancamento );

		for ( Long removedId : idsSubRemoved )
		{
			int count = this.lancamentoRepository.countByCategoriaId( removedId  );

			Assert.isTrue( count == 0, "Não é possível excluir a sub categoria "+this.categoriaRepository.findOne( removedId ).getNome()+" pois a mesma está vinculado á outro lançamento." );
			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}

		return lancamentoSaved;
	}

	/**
	 * Método para atualizar um lancamento
	 * @param lancamento
	 * @return
	 */
	public Lancamento updateLancamento(Lancamento lancamento)
	{
		return this.lancamentoRepository.save( this.lancamentoRepository.save( lancamento ) );
	}

	/**
	 * Método para exlcuir um lancamento
	 * @param id
	 */
	public void deleteLancamento(long id)
	{
		this.lancamentoRepository.delete( id );
		this.lancamentoRepository.flush();
	}

	/**
	 * Método para buscar um lancamento pelo id
	 * @param id
	 * @return
	 */
	public Lancamento findLancamentoById(long id)
	{
		return this.lancamentoRepository.findOne( id );
	}


	public List<Lancamento> listLancamentoByFilters( String descricao, LocalDate data, TipoLancamento tipo, Long lancamentoId )
	{
		LocalDateTime newData = null;
		if(data != null)
			newData = LocalDateTime.of( data, LocalTime.MIN );

		return this.lancamentoRepository.listByFilters(descricao, newData, tipo, lancamentoId);
	}

	public List<Terceiro> listAllTerceiros()
	{
		return this.terceiroRepository.findAll();
	}

	/*-------------------------------------------------------------------
	 *				 		     CATEGORIAS
	 *-------------------------------------------------------------------*/


	public List<Categoria> listAllCategorias()
	{
		return this.categoriaRepository.findAll().stream()
				.filter( categoria -> categoria.getCategoriaPai() == null )
				.collect( Collectors.toList());
	}

	public void insertAndRemoveAllCategorias(List<Categoria> categorias, List<Long> idsRemoved, List<Long> idsSubRemoved)
	{

		for ( Long removedId : idsSubRemoved )
		{
			int count = this.lancamentoRepository.countByCategoriaId( removedId  );
			Assert.isTrue( count == 0, "Não é possível excluir a sub categoria "+this.categoriaRepository.findOne( removedId ).getNome()+" pois a mesma está vinculado á um ou mais lançamentos." );

			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}


		for ( Long removedId : idsRemoved )
		{
			this.categoriaRepository.delete( removedId );
			this.categoriaRepository.flush();
		}

		if(categorias != null && categorias.size() > 0)
			categorias.forEach( categoria -> {

				Categoria categoriaSaved = this.categoriaRepository.saveAndFlush( categoria );

				categoria.getSubCategorias().forEach( subCategoria -> {
					subCategoria.setCategoriaPai( categoriaSaved );
					this.categoriaRepository.saveAndFlush( subCategoria );
				});

			});

	}

}

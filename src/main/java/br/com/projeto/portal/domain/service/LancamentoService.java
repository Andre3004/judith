package br.com.projeto.portal.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import br.com.projeto.portal.domain.entity.lancamento.Categoria;
import br.com.projeto.portal.domain.repository.ICategoriaRepository;
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

	/*-------------------------------------------------------------------
	 *				 		     SERVICES
	 *-------------------------------------------------------------------*/

	/**
	 * Método para inserir um categoria
	 * @param categoria
	 * @return
	 */
	public Categoria insertCategoria( Categoria categoria)
	{
		Categoria categoriaSaved = this.categoriaRepository.save( categoria );
		this.categoriaRepository.flush();

		return categoriaSaved;
	}

	/**
	 * Método para atualizar um categoria
	 * @param categoria
	 * @return
	 */
	public Categoria updateCategoria(Categoria categoria)
	{
		return this.categoriaRepository.save( this.categoriaRepository.save( categoria ) );
	}

	/**
	 * Método para exlcuir um categoria
	 * @param id
	 */
	public void deleteCategoria(long id)
	{
		this.categoriaRepository.delete( id );
		this.categoriaRepository.flush();
	}

	/**
	 * Método para buscar um categoria pelo id
	 * @param id
	 * @return
	 */
	public Categoria findCategoriaById( long id)
	{
		return this.categoriaRepository.findOne( id );
	}

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

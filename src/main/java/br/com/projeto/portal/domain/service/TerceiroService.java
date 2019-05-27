package br.com.projeto.portal.domain.service;

import java.util.List;

import br.com.projeto.portal.application.security.ContextHolder;
import br.com.projeto.portal.domain.entity.usuario.Terceiro;
import br.com.projeto.portal.domain.repository.ITerceiroRepository;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
@RemoteProxy
@Transactional
public class TerceiroService
{

	@Autowired
	private ITerceiroRepository terceiroRepository;

	/**
	 * Método para inserir um terceiro
	 *
	 * @param terceiro
	 * @return
	 */
	public Terceiro insertTerceiro( Terceiro terceiro )
	{
		return this.terceiroRepository.save( terceiro );
	}

	/**
	 * Método para atualizar um terceiro
	 *
	 * @param terceiro
	 * @return
	 */
	public Terceiro updateTerceiro( Terceiro terceiro )
	{
		return this.terceiroRepository.saveAndFlush( terceiro );
	}

	/**
	 * Método para exlcuir um terceiro
	 *
	 * @param id
	 */
	public void deleteTerceiro( long id )
	{
		this.terceiroRepository.delete( id );
		this.terceiroRepository.flush();
	}

	public Terceiro findByIf( long id )
	{
		return this.terceiroRepository.findOne( id );
	}
}

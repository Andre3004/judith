package br.com.projeto.portal.domain.service;

import java.util.List;

import br.com.projeto.portal.domain.entity.conta.Banco;
import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.repository.IBancoRepository;
import br.com.projeto.portal.domain.repository.IContaRepository;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RemoteProxy
@Transactional
public class ContaService
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@Autowired
	private IContaRepository contaRepository;

	@Autowired
	private IBancoRepository bancoRepository;
	/*-------------------------------------------------------------------
	 *				 		     SERVICES
	 *-------------------------------------------------------------------*/


	/**
	 * Método para inserir um conta
	 * @param conta
	 * @return
	 */
	public Conta insertConta( Conta conta)
	{
		return this.contaRepository.save( conta );
	}

	/**
	 * Método para atualizar um conta
	 * @param conta
	 * @return
	 */
	public Conta updateConta(Conta conta)
	{
		return this.contaRepository.save( this.contaRepository.save( conta ) );
	}

	/**
	 * Método para exlcuir um conta
	 * @param id
	 */
	public void deleteConta(long id)
	{
		this.contaRepository.delete( id );
		this.contaRepository.flush();
	}

	/**
	 * Método para buscar um conta pelo id
	 * @param id
	 * @return
	 */
	public Conta findContaById(long id)
	{
		return this.contaRepository.findOne( id );
	}

	public List<Banco> listAllBancos()
	{
		return this.bancoRepository.findAll();
	}

	public List<Conta> listAllContas()
	{
		return this.contaRepository.findAll();
	}
}

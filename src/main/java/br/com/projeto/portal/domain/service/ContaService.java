package br.com.projeto.portal.domain.service;

import java.util.List;

import br.com.projeto.portal.application.security.ContextHolder;
import br.com.projeto.portal.domain.entity.conta.Banco;
import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import br.com.projeto.portal.domain.repository.IBancoRepository;
import br.com.projeto.portal.domain.repository.IContaRepository;
import br.com.projeto.portal.domain.repository.ILancamentoRepository;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

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
	private ILancamentoRepository lancamentoRepository;

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
		Assert.isTrue(conta.getNome() != null && !conta.getNome().equals( "" ), "O campo nome deve ser preenchido");
		Assert.isTrue(!this.contaRepository.existsByNomeIgnoreCaseAndUsuario_id( conta.getNome(), ContextHolder.getAuthenticatedUser().getId() ), "O campo nome já está cadastrado em outro registro.");

		conta.setUsuario( ContextHolder.getAuthenticatedUser() );

		return this.contaRepository.save( conta );
	}

	/**
	 * Método para atualizar um conta
	 * @param conta
	 * @return
	 */
	public Conta updateConta(Conta conta)
	{
		Assert.isTrue(conta.getNome() != null && !conta.getNome().equals( "" ), "O campo nome deve ser preenchido");
		Assert.isTrue(!this.contaRepository.existsByNomeIgnoreCaseAndIdNotAndUsuario_id( conta.getNome(), conta.getId(), ContextHolder.getAuthenticatedUser().getId() ), "O campo nome já está cadastrado em outro registro.");
		return this.contaRepository.save( this.contaRepository.save( conta ) );
	}

	/**
	 * Método para exlcuir um conta
	 * @param id
	 */
	public void deleteConta(long id)
	{
		List<Lancamento> lancamentos = this.lancamentoRepository.findByContaId( id );
		for ( Lancamento lancamento : lancamentos )
		{
			this.lancamentoRepository.delete( lancamento );
		}

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
		return this.contaRepository.findByUsuario_Id(ContextHolder.getAuthenticatedUser().getId());
	}
}

package br.com.projeto.portal.domain.repository;

import br.com.projeto.portal.domain.entity.conta.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContaRepository extends JpaRepository<Conta, Long>
{
	boolean existsByNomeIgnoreCase(String nome);

	boolean existsByNomeIgnoreCaseAndIdNot(String nome, Long id );
}

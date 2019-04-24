package br.com.projeto.portal.domain.repository;

import java.util.List;

import br.com.projeto.portal.domain.entity.conta.Conta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContaRepository extends JpaRepository<Conta, Long>
{
	boolean existsByNomeIgnoreCaseAndUsuario_id(String nome, Long usuarioId);

	boolean existsByNomeIgnoreCaseAndIdNotAndUsuario_id(String nome, Long id,  Long usuarioId );

	List<Conta> findByUsuario_Id(Long usuarioId);
}

package br.com.projeto.portal.domain.repository;

import br.com.projeto.portal.domain.entity.lancamento.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoriaRepository  extends JpaRepository<Categoria, Long>
{
	boolean existsByNomeIgnoreCase(String nome);

	boolean existsByNomeIgnoreCaseAndIdNot(String nome, Long id );
}

package br.com.projeto.portal.domain.repository;

import br.com.projeto.portal.domain.entity.usuario.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEnderecoRepository extends JpaRepository<Endereco, Long>
{
}

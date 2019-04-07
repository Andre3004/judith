package br.com.projeto.portal.domain.repository;

import br.com.projeto.portal.domain.entity.conta.Banco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBancoRepository  extends JpaRepository<Banco, Long>
{

}

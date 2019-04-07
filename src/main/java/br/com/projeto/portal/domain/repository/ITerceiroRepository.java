package br.com.projeto.portal.domain.repository;

import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.entity.usuario.Terceiro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITerceiroRepository extends JpaRepository<Terceiro, Long>
{
}

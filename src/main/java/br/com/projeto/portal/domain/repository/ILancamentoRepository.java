package br.com.projeto.portal.domain.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ILancamentoRepository  extends JpaRepository<Lancamento, Long>
{

	@Query( "Select distinct lancamento " +
			"FROM Lancamento lancamento " +
			"Where ( cast(:data as date) IS NULL OR lancamento.created >= :data ) AND " +
			"(:descricao IS NULL OR lower(lancamento.descricao) like lower(concat('%',:descricao,'%')))  AND "+
			"(lancamento.tipo = :tipo OR :tipo IS NULL) AND "+
			"(lancamento.conta.id = :contaId OR :contaId IS NULL)")
	List<Lancamento> listByFilters( @Param( "descricao" ) String descricao, @Param( "data" ) LocalDateTime data, @Param( "tipo" ) TipoLancamento tipo, @Param( "contaId" ) Long contaId );


	int countByCategoriaId(long categoriaId);

	List<Lancamento> findByContaId( long id );
}

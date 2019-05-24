package br.com.projeto.portal.domain.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import br.com.projeto.portal.domain.entity.enums.SituacaoLancamento;
import br.com.projeto.portal.domain.entity.enums.TipoLancamento;
import br.com.projeto.portal.domain.entity.lancamento.Lancamento;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ILancamentoRepository  extends JpaRepository<Lancamento, Long>
{

	@EntityGraph(attributePaths = {"conta", "categoria", "favorecidoPagador", "lancamentoPai", "categoria.subCategorias"})
	@Query( "Select distinct lancamento " +
			"FROM Lancamento lancamento " +
			"Where ( cast(:dataInicial as date) IS NULL OR lancamento.created >= :dataInicial ) AND " +
			"( cast(:dataFinal as date) IS NULL OR lancamento.created <= :dataFinal ) AND " +
			"(:descricao IS NULL OR lower(lancamento.descricao) like lower(concat('%',:descricao,'%')))  AND "+
			"(lancamento.tipo = :tipo OR :tipo IS NULL) AND "+
			"(lancamento.conta.id = :contaId OR :contaId IS NULL) AND " +
			"(lancamento.conta.usuario.id = :usuarioId OR :usuarioId IS NULL)")
	List<Lancamento> listByFilters( @Param( "descricao" ) String descricao,
									@Param( "tipo" ) TipoLancamento tipo,
									@Param( "contaId" ) Long contaId,
									@Param( "usuarioId" ) Long usuarioId,
									@Param( "dataInicial" ) LocalDateTime dataInicial,
									@Param( "dataFinal" ) LocalDateTime dataFinal);

	@Query( "Select distinct lancamento " +
			"FROM Lancamento lancamento " +
			"Where (lancamento.situacaoLancamento = :situacao OR :situacao IS NULL) AND" +
			"(lancamento.conta.usuario.id = :usuarioId OR :usuarioId IS NULL) ")
	List<Lancamento> listLancamentosToNotification(@Param( "situacao" ) SituacaoLancamento situacao,
												   @Param( "usuarioId" ) Long usuarioId);

	@EntityGraph(attributePaths = {"conta", "categoria", "favorecidoPagador", "lancamentoPai"})
	Lancamento findLancamentoById(Long id);
//( cast(:data as date) IS NULL OR lancamento.created >= :data ) AND

	int countByCategoriaId(long categoriaId);

	@EntityGraph(attributePaths = {"conta", "categoria", "favorecidoPagador", "lancamentoPai"})
	List<Lancamento> findByContaId( long id );

	@Query( "Select distinct lancamento " +
			"FROM Lancamento lancamento " +
			"Where (lancamento.contaDestino.id = :id OR :id IS NULL) AND " +
			"(lancamento.situacaoLancamento = :situacao OR :situacao IS NULL) AND "+
			"(lancamento.tipo = :tipo OR :tipo IS NULL) ")
	List<Lancamento> listByContaDestinoIdAndTipoEquals( @Param( "id" ) Long id, @Param( "tipo" ) TipoLancamento tipo, @Param( "situacao" ) SituacaoLancamento situacao);

	@EntityGraph(attributePaths = {"conta", "categoria", "favorecidoPagador", "lancamentoPai", "categoria.subCategorias"})
	@Query( "Select distinct lancamento " +
			"FROM Lancamento lancamento " +
			"Where ( cast(:data as date) IS NULL OR lancamento.dataVencimento <= :data ) AND " +
			"(lancamento.situacaoLancamento = :situacao OR :situacao IS NULL) AND "+
			"(lancamento.conta.usuario.id = :usuarioId OR :usuarioId IS NULL) " )
	List<Lancamento> listProximosVencer( @Param("situacao") SituacaoLancamento situacao,
	                                     @Param("usuarioId") Long usuarioId,
										  @Param("data") LocalDate data );
}

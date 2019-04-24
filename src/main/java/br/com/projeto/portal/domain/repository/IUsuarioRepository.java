/**
 *
 */
package br.com.projeto.portal.domain.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projeto.portal.domain.entity.usuario.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long>
{
	/**
	 *
	 */
	@Query("FROM Usuario usuario WHERE lower(usuario.email) = lower(:email)")
	Usuario findByEmail(@Param("email") String email);
}

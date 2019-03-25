package portal.projeto.test.domain.service;

import br.com.projeto.portal.domain.entity.usuario.Usuario;
import portal.projeto.test.domain.AbstractIntegrationTest;

import br.com.projeto.portal.domain.service.UsuarioService;
import static org.junit.Assert.*;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;


/**
 *
 */
public class UsuarioServiceIntegrationTests extends AbstractIntegrationTest
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	/**
	 *
	 */
	@Autowired
	private UsuarioService usuarioService;
	/*-------------------------------------------------------------------
	 *				 		     TESTS
	 *-------------------------------------------------------------------*/


	@Test
	@Sql({
			"/dataset/usuario/usuario.sql",
	})
//	@WithUserDetails("admin@admin.com")
	public void insertUsuarioMustPass()
	{
		final Usuario newUsuario = new Usuario();

		newUsuario.setNome( "André Damasceno"  );

		final Usuario usuarioSaved = this.usuarioService.insertUsuario( newUsuario );

		Assert.assertNotNull( usuarioSaved );
		Assert.assertNotNull( usuarioSaved.getNome() );

	}

	@Test( expected = IllegalArgumentException.class )
	@Sql({
			"/dataset/usuario/usuario.sql",
	})
//	@WithUserDetails("admin@admin.com")
	public void insertUsuarioMustFailWithSameName()
	{
		final Usuario newUsuario = new Usuario();

		newUsuario.setNome( "André"  );

		final Usuario usuarioSaved = this.usuarioService.insertUsuario( newUsuario );

		Assert.fail();
	}
}
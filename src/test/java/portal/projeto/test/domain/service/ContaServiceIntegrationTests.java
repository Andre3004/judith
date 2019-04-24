package portal.projeto.test.domain.service;

import javax.validation.ValidationException;

import br.com.projeto.portal.domain.entity.conta.Conta;
import br.com.projeto.portal.domain.entity.enums.TipoConta;
import br.com.projeto.portal.domain.service.ContaService;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.jdbc.Sql;
import portal.projeto.test.domain.AbstractIntegrationTest;

public class ContaServiceIntegrationTests extends AbstractIntegrationTest
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	/**
	 *
	 */
	@Autowired
	private ContaService contaService;
	/*-------------------------------------------------------------------
	 *				 		     TESTS
	 *-------------------------------------------------------------------*/


	@Test( expected = DataIntegrityViolationException.class )
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void insertContaMustFailWithSameNames()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		final Conta newConta2 = new Conta();

		newConta2.setNome( "Conta 1"  );
		newConta2.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved2 = this.contaService.insertConta( newConta2 );

		Assert.fail();
	}

	@Test
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void insertContaMustPassWithDifferentNames()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		final Conta newConta2 = new Conta();

		newConta2.setNome( "Conta 2"  );
		newConta2.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved2 = this.contaService.insertConta( newConta2 );
	}

	@Test( expected = IllegalArgumentException.class )
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void insertContaMustFailWithoutName()
	{
		final Conta newConta = new Conta();

		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		Assert.fail();
	}

	@Test( expected = ValidationException.class )
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void insertContaMustFailWithoutTipo()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1" );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		Assert.fail();
	}

	@Test
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void deleteContaMustPass()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		this.contaService.deleteConta( contaSaved.getId() );
	}

	@Test( expected = DataIntegrityViolationException.class )
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void updateContaMustFailWithSameNames()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		final Conta newConta2 = new Conta();

		newConta2.setNome( "Conta 2"  );
		newConta2.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved2 = this.contaService.insertConta( newConta2 );

		contaSaved2.setNome( "Conta 1" );

		this.contaService.updateConta( contaSaved2 );

		Assert.fail();
	}

	@Test
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void updateContaMustPassWithDifferentNames()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		final Conta newConta2 = new Conta();

		newConta2.setNome( "Conta 2"  );
		newConta2.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved2 = this.contaService.insertConta( newConta2 );

		contaSaved2.setNome( "Conta 3" );

		this.contaService.updateConta( contaSaved2 );
	}


	@Test( expected = IllegalArgumentException.class)
	@Sql({
			"/dataset/usuario/endereco.sql",
			"/dataset/usuario/usuario.sql",
	})
	@WithUserDetails("admin@admin.com")
	public void updateContaMustFailWithoutName()
	{
		final Conta newConta = new Conta();

		newConta.setNome( "Conta 1"  );
		newConta.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved = this.contaService.insertConta( newConta );

		final Conta newConta2 = new Conta();

		newConta2.setNome( "Conta 2"  );
		newConta2.setTipo( TipoConta.CONTROLE_INTERNO );

		final Conta contaSaved2 = this.contaService.insertConta( newConta2 );

		contaSaved2.setNome( null);

		this.contaService.updateConta( contaSaved2 );

		Assert.fail();
	}
}

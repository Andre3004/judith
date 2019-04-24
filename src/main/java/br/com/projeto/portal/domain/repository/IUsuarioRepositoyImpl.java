package br.com.projeto.portal.domain.repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import br.com.projeto.portal.domain.entity.usuario.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class IUsuarioRepositoyImpl implements UserDetailsService
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/
	/**
	 *
	 */
	private final EntityManager entityManager;

	@Autowired
	public IUsuarioRepositoyImpl( EntityManager entityManager )
	{
		this.entityManager = entityManager;
	}

	/*-------------------------------------------------------------------
	 *				 		     BEHAVIORS
	 *-------------------------------------------------------------------*/
	/*
	 * (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	@Override
	@Transactional
	public UserDetails loadUserByUsername( String email ) throws UsernameNotFoundException
	{
		try
		{
			final String hql = "FROM Usuario usuario "
					+ "WHERE lower(usuario.email) = lower(:email)";

			final TypedQuery<Usuario> query = this.entityManager.createQuery( hql, Usuario.class );
			query.setParameter( "email", email );

			return query.getSingleResult();
		}
		catch ( NoResultException e )
		{
			throw new UsernameNotFoundException( "This email '" + email + "' was not found" );
		}
	}
}

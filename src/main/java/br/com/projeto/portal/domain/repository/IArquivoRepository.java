package br.com.projeto.portal.domain.repository;

import java.util.Optional;

import br.com.projeto.portal.domain.entity.Arquivo;
import org.directwebremoting.io.FileTransfer;

public interface IArquivoRepository
{
	Optional<Arquivo> findByUuid( String uuid );

	Arquivo insert( FileTransfer fileTransfer );

	Arquivo update( String uuid, FileTransfer fileTransfer );

	void delete( String uuid );
}
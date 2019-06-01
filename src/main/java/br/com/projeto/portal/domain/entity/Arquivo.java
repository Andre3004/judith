package br.com.projeto.portal.domain.entity;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Paths;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.io.FileTransfer;
import org.hibernate.envers.Audited;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.eits.common.infrastructure.file.MimeType;


@Data
@Table
@Entity
@Audited
@NoArgsConstructor
@EqualsAndHashCode( callSuper = true )
@DataTransferObject(javascript = "Arquivo")
public class Arquivo extends AbstractEntity
{

	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	/**
	 *
	 */
	@NotNull @Column( nullable = false ) private String uuid;
	@NotNull @Column( nullable = false ) private String nomeOriginal;

	/**
	 *
	 */
	@Transient private FileTransfer fileTransfer;
	@Transient @Setter private String rootPath;

	/**
	 *
	 */
	private String mimeType;

	/*-------------------------------------------------------------------
	 *				 		     BEHAVIORS
	 *-------------------------------------------------------------------*/

	/**
	 *
	 * @return
	 */
	public FileTransfer toFileTransfer()
	{
		try
		{
			return new FileTransfer(
					nomeOriginal,
					mimeType != null ? mimeType : MimeType.BIN.value, new FileInputStream( Paths.get( rootPath, uuid ).toFile() ) );
		}
		catch ( FileNotFoundException e )
		{
			throw new IllegalStateException("O arquivo \"" + nomeOriginal
					+ "\" requisitado não existe no sistema de arquivos.", e );
		}
	}
}
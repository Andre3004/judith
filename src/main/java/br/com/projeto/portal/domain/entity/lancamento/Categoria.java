package br.com.projeto.portal.domain.entity.lancamento;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import br.com.eits.common.domain.entity.AbstractEntity;
import br.com.projeto.portal.domain.entity.usuario.Usuario;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.directwebremoting.annotations.DataTransferObject;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@DataTransferObject(javascript = "Categoria")
public class Categoria extends AbstractEntity
{
	/*-------------------------------------------------------------------
	 *				 		     ATTRIBUTES
	 *-------------------------------------------------------------------*/

	@NotBlank
	@Column(unique = true)
	private String nome;

	@ManyToOne
	private Categoria categoriaPai;

	@Transient
	private Boolean isSelected;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "categoriaPai")
	private List<Categoria> subCategorias = new ArrayList<Categoria>();

}

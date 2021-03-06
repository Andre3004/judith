import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { SituacaoLancamentoValues, Categoria, Terceiro } from './../../../generated/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { TipoLancamentoValues, PeriodoValues, Lancamento, Conta } from 'src/generated/entities';
import { ContaService, LancamentoService, ArquivoService } from 'src/generated/services';

@Component({
  selector: 'app-lancament-form',
  templateUrl: './lancament-form.component.html',
  styleUrls: ['./lancament-form.component.scss']
})
export class LancamentFormComponent implements OnInit
{

  public tipos = TipoLancamentoValues;

  public periodos = PeriodoValues;

  public lancamento: Lancamento = { haveNotification: false }

  public contas: Conta[] = [];

  public situacoes = SituacaoLancamentoValues;

  public categorias: Categoria[] = [];

  public subCategoriasRemovedIds: any[] = [];

  public terceiros: Terceiro[] = [];

  /**
   * 
   */
  public fotoImage: any;
  nomeArquivo: any;

  constructor(public dialogRef: MatDialogRef<LancamentFormComponent>,
    private contaService: ContaService,
    private arquivoService: ArquivoService,
    private lancamentoService: LancamentoService,
    private openSnackBarService: OpenSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    if (this.data.lancamento)
    {
      this.lancamento = this.data.lancamento;
      let subCategoriaId = this.lancamento.categoria.id;
      this.lancamento.categoria = this.lancamento.categoria.categoriaPai;
      this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id == subCategoriaId)[0].isSelected = true;
      this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id != subCategoriaId).forEach(subCategoria => subCategoria.isSelected = false);
    }

    if (this.data.tipo)
    {
      this.lancamento.tipo = this.data.tipo;
    }

    if (this.data.id)
    {
      this.lancamentoService.findLancamentoById(this.data.id).subscribe(result =>
      {
        this.lancamento = result;

        let subCategoriaId = this.lancamento.categoria.id;
        this.lancamento.categoria = this.lancamento.categoria.categoriaPai;
        this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id == subCategoriaId)[0].isSelected = true;
        this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id != subCategoriaId).forEach(subCategoria => subCategoria.isSelected = false);
      }, err => console.log(err))
    }

    this.onListAllContasWithoutUser();
    this.listAllCategorias();
    this.listAllTerceiros();
  }

  onNoClick(): void
  {
    if (this.lancamento.tipo && this.lancamento.tipo == 'TRANSFERENCIA' && !this.lancamento.contaDestino)
    {
      this.openSnackBarService.open("O campo conta destino deve ser preenchido")
      return;
    }
    else
    {
      if (this.lancamento.contaDestino && this.lancamento.conta && this.lancamento.contaDestino.id && this.lancamento.conta.id)
      {
        if (this.lancamento.contaDestino.id == this.lancamento.conta.id)
        {
          this.openSnackBarService.open("A conta destino e a conta origem não podem ser as mesmas.")
          return;
        }
      }
    }

    if (this.lancamento.situacaoLancamento && this.lancamento.situacaoLancamento == 'LIQUIDADO' && !this.lancamento.valorPago)
    {
      this.openSnackBarService.open("O campo valor pago deve ser preenchido")
      return;
    }

    this.lancamentoService.insertLancamento(this.lancamento, this.subCategoriasRemovedIds).subscribe(result =>
    {
      this.openSnackBarService.open("Lancamento salvo com sucesso!")
      this.dialogRef.close();
    }, err => this.openSnackBarService.open(err.message.split('.')[0]))

  }

  private onListAllContasWithoutUser(): any
  {
    this.contaService.listAllContas().subscribe(contas =>
    {
      this.contas = contas;
    })
  }

  public addSubCategoria(categoria)
  {
    if (!categoria.subCategorias) categoria.subCategorias = [];
    categoria.subCategorias.push({ nome: "", categoriaPai: categoria });
  }

  private listAllCategorias(): any
  {
    this.lancamentoService.listAllCategorias().subscribe(categorias =>
    {
      this.categorias = categorias;
    }, err => console.log(err.message))
  }

  public removeSubCategoria(categoria, i)
  {
    if (categoria.subCategorias[i].id)
      this.subCategoriasRemovedIds.push(categoria.subCategorias[i].id);
    categoria.subCategorias.splice(i, 1);
  }

  public listAllTerceiros()
  {
    this.lancamentoService.listAllTerceiros().subscribe(terceiros =>
    {
      this.terceiros = terceiros;
    }, err => console.log(err.message))
  }

  public compareObjects(o1: any, o2: any): boolean
  {
    return o1.id == o2.id;
  }

  public onChangeSelectSubCategoria(id, index, event: MatCheckboxChange)
  {
    if (event.checked)
    {
      this.lancamento.categoria.subCategorias.filter(categoria => categoria.id != id).forEach(categoria => categoria.isSelected = false)
      this.lancamento.categoria.subCategorias[index].isSelected = true;
    }
    else
      this.lancamento.categoria.subCategorias[index].isSelected = false;
  }

  get getTotalRecorrencia()
  {
    let totalOcorrencias = 0;
    let ocorrencias = this.lancamento.parcelasTotal - this.lancamento.parcelasPagas;
    this.lancamento.quantidadeRepeticaoRecorrencia = isNaN(ocorrencias) ? 0 : ocorrencias + 1;

    if (!isNaN(ocorrencias) && this.lancamento.valor)
    {
      totalOcorrencias = (ocorrencias + 1) * this.lancamento.valor;
    }

    return totalOcorrencias;
  }

  public removeAnexo()
  {
    this.lancamento.anexo = null;
    this.lancamento.anexoUuid = null;
    this.fotoImage = null;
  }

  public downloadFile()
  {
    this.arquivoService.downloadArquivoByUuid(this.lancamento.anexoUuid).subscribe(result =>{
      window.location.href = result;
    }, (exception) => this.openSnackBarService.open(exception.message))
  }

  public setLancamentoAnexo(event)
  {
    if (event.target.files[0])
    {
      if (event.target.files[0].size <= 10000000) //10MB
      {
        this.lancamento.anexo = event.target;

        this.nomeArquivo = event.target.files[0].name;

        let reader = new FileReader();

        reader.onload = (event: any) =>
        {
          this.fotoImage = event.target.result;
        };
        this.lancamento.anexoUuid = null;
        reader.readAsDataURL(event.target.files[0]);
      }
      else
      {
        this.openSnackBarService.open("O tamanho da foto não pode ser maior que 10MB");
      }
    }
    else
    {
      this.lancamento.anexo = null;
    }
  }
}

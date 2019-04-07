import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { SituacaoLancamentoValues, Categoria, Terceiro, TipoPessoa, TipoPessoaValues } from './../../../generated/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { TipoContaValues, TipoLancamentoValues, PeriodoValues, Lancamento, Conta } from 'src/generated/entities';
import { ContaService, LancamentoService } from 'src/generated/services';

@Component({
  selector: 'app-lancament-form',
  templateUrl: './lancament-form.component.html',
  styleUrls: ['./lancament-form.component.scss']
})
export class LancamentFormComponent implements OnInit
{

  public tipos = TipoLancamentoValues;

  public periodos = PeriodoValues;

  public lancamento: Lancamento = {}

  public contas: Conta[] = [];

  public situacoes = SituacaoLancamentoValues;

  public categorias: Categoria[] = [];

  public subCategoriasRemovedIds: any[] = [];

  public terceiros : Terceiro[] = [];

  constructor(public dialogRef: MatDialogRef<LancamentFormComponent>,
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    private openSnackBarService: OpenSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    if(this.data.lancamento)
    {
      this.lancamento = this.data.lancamento;
      let subCategoriaId = this.lancamento.categoria.id;
      this.lancamento.categoria = this.lancamento.categoria.categoriaPai;
      this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id == subCategoriaId)[0].isSelected = true;
      this.lancamento.categoria.subCategorias.filter(subCategoria => subCategoria.id != subCategoriaId).forEach( subCategoria => subCategoria.isSelected = false);
    }

    if(this.data.tipo)
    {
      this.lancamento.tipo = this.data.tipo;
    }

    this.onListAllContasWithoutUser();
    this.listAllCategorias();
    this.listAllTerceiros();
  }

  onNoClick(): void
  {
    if(this.lancamento.tipo && this.lancamento.tipo == 'TRANSFERENCIA' && !this.lancamento.contaDestino)
    {
      this.openSnackBarService.open("O campo conta destino deve ser preenchido")
      return;
    }
    else
    {
      if(this.lancamento.contaDestino && this.lancamento.conta && this.lancamento.contaDestino.id && this.lancamento.conta.id)
      {
        if(this.lancamento.contaDestino.id == this.lancamento.conta.id)
        {
          this.openSnackBarService.open("A conta destino e a conta origem não podem ser as mesmas.")
          return;
        }
      }
    }

    if(this.lancamento.situacaoLancamento && this.lancamento.situacaoLancamento == 'LIQUIDADO' && !this.lancamento.valorPago)
    {
      this.openSnackBarService.open("O campo valor pago deve ser preenchido")
      return;
    }

    this.lancamentoService.insertLancamento(this.lancamento, this.subCategoriasRemovedIds).subscribe( result => {
      this.openSnackBarService.open("Lancamento salvo com sucesso!")
      this.dialogRef.close();
    }, err => this.openSnackBarService.open(err.message.split('.')[0]) )
    
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
    if(!categoria.subCategorias) categoria.subCategorias = [];
    categoria.subCategorias.push({nome: "", categoriaPai: categoria});
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
    if(categoria.subCategorias[i].id)
      this.subCategoriasRemovedIds.push(categoria.subCategorias[i].id);
    categoria.subCategorias.splice(i, 1);
  }

  public listAllTerceiros()
  {
    this.lancamentoService.listAllTerceiros().subscribe(terceiros => {
      this.terceiros = terceiros;
    }, err => console.log(err.message))
  }

  public compareObjects(o1: any, o2: any): boolean
  {
    return o1.id == o2.id;
  }

  public onChangeSelectSubCategoria(id, index, event: MatCheckboxChange)
  {
    if(event.checked)
    {
      this.lancamento.categoria.subCategorias.filter( categoria => categoria.id != id).forEach(categoria => categoria.isSelected = false)
      this.lancamento.categoria.subCategorias[index].isSelected = true;
    }
  }
}

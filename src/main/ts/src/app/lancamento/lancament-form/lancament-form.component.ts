import { SituacaoLancamentoValues, Categoria } from './../../../generated/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(public dialogRef: MatDialogRef<LancamentFormComponent>,
    private contaService: ContaService,
    private lancamentoService: LancamentoService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    this.onListAllContasWithoutUser();
    this.listAllCategorias();
  }

  onNoClick(): void
  {
    //validar se a conta origem e a destino é igual 
    this.dialogRef.close();
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
}

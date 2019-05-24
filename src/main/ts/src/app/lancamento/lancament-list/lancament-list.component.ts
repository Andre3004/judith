import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { ContaService, LancamentoService } from 'src/generated/services';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { TipoLancamentoValues, Lancamento } from 'src/generated/entities';
import { LancamentFormComponent } from '../lancament-form/lancament-form.component';
import { TdDialogService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';
import { FilterVencidosComponent } from './filter-vencidos/filter-vencidos.component';

@Component({
  selector: 'app-lancament-list',
  templateUrl: './lancament-list.component.html',
  styleUrls: ['./lancament-list.component.scss']
})
export class LancamentListComponent implements OnInit
{

  public tipos = TipoLancamentoValues;

  public contas = [];

  public lancamentosReceita: Lancamento[] = [];
  public lancamentosDespesa: Lancamento[] = [];
  public lancamentosTransferencia: Lancamento[] = [];

  public filters = {
    descricao: "", 
    data: null, 
    tipo: null,
    contaId:null,
    dataInicial: null, 
    dataFinal: null
  }
  
  public meses = ['Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro']
  public currentMonth = new Date().getMonth();

  public currentYear = new Date().getFullYear();

  constructor(public dialog: MatDialog,
    private lancamentoService: LancamentoService,
    private _dialogService: TdDialogService, 
    private openSnackBarService: OpenSnackBarService,
    public activatedRoute: ActivatedRoute,
    private contaService: ContaService,
    private bottomSheet: MatBottomSheet)
  { }

  ngOnInit()
  {
    this.onListAllContasWithoutUser();
    this.onListAllLancamenos();

    if(this.activatedRoute.snapshot.params['tipo'] && !this.activatedRoute.snapshot.params['id'])
    { 
      this.onOpenDialogLancamento(null, this.activatedRoute.snapshot.params['tipo']);
    }
    else if(this.activatedRoute.snapshot.params['tipo'] && this.activatedRoute.snapshot.params['id'])
    { 
      this.onOpenDialogLancamento(null, this.activatedRoute.snapshot.params['tipo'], this.activatedRoute.snapshot.params['id']);
    }
  }


  public onListAllLancamenos()
  {
    this.lancamentoService.listLancamentoByFilters(
      this.filters.descricao, 
      this.filters.tipo, 
      this.filters.contaId,
      this.filters.dataInicial, 
      this.filters.dataFinal,  ).subscribe(lancamentos => {

          this.lancamentosReceita = lancamentos.filter( lancamento => lancamento.tipo == 'RECEITA');
          this.lancamentosDespesa = lancamentos.filter( lancamento => lancamento.tipo == 'DESPESA');
          this.lancamentosTransferencia = lancamentos.filter( lancamento => lancamento.tipo == 'TRANSFERENCIA');

      })
  }

  private onListAllContasWithoutUser(): any
  {
    this.contaService.listAllContas().subscribe(contas =>
    {
      this.contas = contas;
    })
  }


  public onOpenDialogLancamento(lancamento, tipo, id=null)
  {
    const dialogRef = this.dialog.open(LancamentFormComponent, {
      width: '1100px',
      height: 'auto',
      data: {lancamento: lancamento, tipo: tipo, id: id}
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      this.onListAllLancamenos();
    });
  }

  public openConfirmExcluirLancamento(id)
  {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir este lançamento ?',
      title: 'Excluir lançamento',
      cancelButton: 'CANCELAR',
      acceptButton: 'CONFIMAR',
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) =>
    {
      if (accept)
      {
        this.lancamentoService.deleteLancamento(id).subscribe(result =>
        {
          this.openSnackBarService.open("Lançamento excluído com sucesso!");
          
          this.onListAllLancamenos();
        }, err => this.openSnackBarService.open(err.message))
      }
    });
  }

  public openBottomSheet(): void {
    this.bottomSheet.open(FilterVencidosComponent).afterDismissed().subscribe( dias => {
        if(dias){
          this.lancamentoService.listLancamentoProximosAvencer(dias).subscribe( lancamentos => {
            this.lancamentosReceita = lancamentos.filter( lancamento => lancamento.tipo == 'RECEITA');
            this.lancamentosDespesa = lancamentos.filter( lancamento => lancamento.tipo == 'DESPESA');
            this.lancamentosTransferencia = lancamentos.filter( lancamento => lancamento.tipo == 'TRANSFERENCIA');
          })
        }
    });
  }

}

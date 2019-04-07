import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { ContaService, LancamentoService } from 'src/generated/services';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { TipoLancamentoValues, Lancamento } from 'src/generated/entities';
import { LancamentFormComponent } from '../lancament-form/lancament-form.component';
import { TdDialogService } from '@covalent/core';
import { ActivatedRoute } from '@angular/router';

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
    contaId:null
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
    private contaService: ContaService)
  { }

  ngOnInit()
  {
    this.onListAllContasWithoutUser();
    this.onListAllLancamenos();

    if(this.activatedRoute.snapshot.params['tipo'])
    { 
      this.onOpenDialogLancamento(null, this.activatedRoute.snapshot.params['tipo']);
    }
  }


  public onListAllLancamenos()
  {
    this.lancamentoService.listLancamentoByFilters(
      this.filters.descricao, 
      this.filters.data, 
      this.filters.tipo, 
      this.filters.contaId, ).subscribe(lancamentos => {

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

  public changeMonth(direction)
  {
    if (direction == 'left')
    {
      this.currentMonth -= 1
      if (this.currentMonth < 0)
      {
        this.currentMonth = 11;
        this.currentYear -= 1;
      }
    }
    else if (direction == 'right')
      this.currentMonth += 1
    if (this.currentMonth > 11)
    {
      this.currentMonth = 0;
      this.currentYear += 1;
    }

    this.filters.data = new Date(this.currentYear, this.currentMonth, 0);

    this.onListAllLancamenos();
  }

  public onOpenDialogLancamento(lancamento, tipo)
  {
    const dialogRef = this.dialog.open(LancamentFormComponent, {
      width: '1100px',
      height: 'auto',
      data: {lancamento: lancamento, tipo: tipo}
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

}

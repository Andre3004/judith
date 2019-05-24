import { TipoLancamento } from './../../generated/entities';
import { OpenSnackBarService } from './../open-snackbar/open-snackbar.service';
import { LancamentFormComponent } from './../lancamento/lancament-form/lancament-form.component';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { ContaFormComponent } from '../conta/conta-form/conta-form.component';
import { TdDialogService } from '@covalent/core';
import { ContaService, LancamentoService } from 'src/generated/services';
import { Conta } from 'src/generated/entities';
import { Router } from '@angular/router';

export interface Section
{
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{

  public contas: Conta[] = [];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) =>
    {
      if (matches)
      {
        return [
          { id: 1, title: 'SALDO', cols: 1, rows: 1 },
          { id: 2, title: 'LANÇAMENTO RÁPIDO', cols: 1, rows: 1 },
          { id: 3, title: 'CONTAS', cols: 2, rows: 2 },
          { id: 4, title: 'GRÁFICO', cols: 1, rows: 1 },
          { id: 5, title: 'DETALHAMENTO', cols: 1, rows: 1 }
        ];
      }

      return [
        { id: 1, title: 'SALDO', cols: 1, rows: 1 },
        { id: 2, title: 'LANÇAMENTO RÁPIDO', cols: 1, rows: 1 },
        { id: 3, title: 'CONTAS', cols: 1, rows: 2 },
        { id: 4, title: 'GRÁFICO', cols: 1, rows: 1 },
        { id: 5, title: 'DETALHAMENTO', cols: 1, rows: 1 }
      ];
    })
  );


  constructor(private breakpointObserver: BreakpointObserver,
    public openSnackBarService: OpenSnackBarService,
    public dialog: MatDialog,
    private contaService: ContaService,
    private _dialogService: TdDialogService,
    private _router: Router,
    private _viewContainerRef: ViewContainerRef,
    private lancamentoService: LancamentoService) { }

  ngOnInit(): void
  {
    this.onListAllContasWithoutUser();

  }

  onListNotificacoes()
  {
    this.lancamentoService.listLancamentosPendentesToNotificacao().subscribe(result =>
    {
      console.log(`notificacoes`, result);
    }, err => console.log(`error`, err))
  }

  //CONTA
  public openDialogFormConta(conta): void
  {
    const dialogRef = this.dialog.open(ContaFormComponent, {
      width: '600px',
      height: 'auto',
      data: { conta: conta }
    });

    dialogRef.afterClosed().subscribe((resultConta: Conta) =>
    {
      this.onListAllContasWithoutUser();
    });
  }

  public openConfirmExcluirConta(conta): void
  {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir esta conta. Todos os lançamentos serão excluídos ?',
      viewContainerRef: this._viewContainerRef,
      title: 'Excluir conta',
      cancelButton: 'CANCELAR',
      acceptButton: 'CONFIMAR',
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) =>
    {
      2
      if (accept)
      {
        this.contaService.deleteConta(conta.id).subscribe(result =>
        {
          this.openSnackBarService.open("Conta excluída com sucesso!");

          this.onListAllContasWithoutUser();
        }, err => this.openSnackBarService.open(err.message))
      }
    });
  }

  public openConfirmDisableConta(conta: Conta): void
  {
    this._dialogService.openConfirm({
      message: conta.isDisabled ? 'Tem certeza que deseja habilitar esta conta ?' : 'Tem certeza que deseja desabilitar esta conta ?',
      viewContainerRef: this._viewContainerRef,
      title: 'Desabilitar conta',
      cancelButton: 'CANCELAR',
      acceptButton: 'CONFIMAR',
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) =>
    {
      if (accept)
      {
        this.contaService.disableConta(conta.id, !conta.isDisabled).subscribe(result =>
        {
          this.openSnackBarService.open(result.isDisabled ? "Conta desabilitada com sucesso!" : "Conta habilitada com sucesso!");
          this.onListAllContasWithoutUser();
        }, err => this.openSnackBarService.open(err.message))
      }
    });
  }

  private onListAllContasWithoutUser()
  {
    this.contaService.listAllContas().subscribe(contas =>
    {
      this.contas = contas.sort((a, b) =>
      {
        if (a.nome < b.nome) { return -1; }
        if (a.nome > b.nome) { return 1; }
        return 0;
      })

      console.log(this.contas)
    }, err => console.log(err))
  }

  private cleanObjet(obj: any)
  {
    for (let key of Object.keys(obj))
    {
      if (obj[key] == null)
        delete obj[key];
    }

  }

  public getSaldoConta(conta)
  {
    let lancamentosDespensa = 0;
    let lancamentosReceita = 0;


    if (conta.lancamentos && conta.lancamentos.length > 0)
    {
      conta.lancamentos
        .filter(lancamento => lancamento.situacaoLancamento == "LIQUIDADO")
        .forEach(lancamento =>
        {
          if (lancamento.tipo == "RECEITA")
            lancamentosReceita += lancamento.valorPago;
          else if (lancamento.tipo == "DESPESA")
            lancamentosDespensa += lancamento.valorPago;
        })
    }


    var result = conta.saldoInicial + lancamentosReceita - lancamentosDespensa + conta.transferencias;

    return isNaN(result) ? 0 : result;

  }

  public onClickLancamentoRapido(tipo: TipoLancamento)
  {
    this._router.navigate(['lancamentos/', tipo]);

  }

  get getSaldo()
  {
    if (this.contas && this.contas.length > 0)
    {

      let saldoIncial = this.contas.map(conta => conta.saldoInicial).reduce((partial_sum, a) => partial_sum + a);
      let transferencias = this.contas.map(conta => conta.transferencias).reduce((partial_sum, a) => partial_sum + a);
      let lancamentosDespensa = 0;
      let lancamentosReceita = 0;

      this.contas.forEach(conta =>
      {

        if (conta.lancamentos && conta.lancamentos.length > 0)
        {
          conta.lancamentos
            .filter(lancamento => lancamento.situacaoLancamento == "LIQUIDADO")
            .forEach(lancamento =>
            {
              if (lancamento.tipo == "RECEITA")
                lancamentosReceita += lancamento.valorPago;
              else if (lancamento.tipo == "DESPESA")
                lancamentosDespensa += lancamento.valorPago;
            })
        }

      })

      var result = saldoIncial + lancamentosReceita - lancamentosDespensa + transferencias;

      return isNaN(result) ? 0 : result;
    }

    return 0;
  }



}

import { TipoLancamento } from './../../generated/entities';
import { OpenSnackBarService } from './../open-snackbar/open-snackbar.service';
import { LancamentFormComponent } from './../lancamento/lancament-form/lancament-form.component';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { ContaFormComponent } from '../conta/conta-form/conta-form.component';
import { TdDialogService } from '@covalent/core';
import { ContaService } from 'src/generated/services';
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
    private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void
  {
    this.onListAllContasWithoutUser();
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

  public openConfirmExcluirConta(id): void
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
      if (accept)
      {
        this.contaService.deleteConta(id).subscribe(result =>
        {
          this.openSnackBarService.open("Conta excluída com sucesso!");
          
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


    if(conta.lancamentos && conta.lancamentos.length > 0)
    {
      conta.lancamentos
        .filter(lancamento => lancamento.situacaoLancamento == "LIQUIDADO")
        .forEach(lancamento => {
          if(lancamento.tipo == "RECEITA")
            lancamentosReceita += lancamento.valorPago;
          else if (lancamento.tipo == "DESPESA")
            lancamentosDespensa += lancamento.valorPago;
          else
            lancamentosDespensa += lancamento.valorPago;        
      })
    }


    return conta.saldoInicial + lancamentosReceita - lancamentosDespensa;

    
  }

  public onClickLancamentoRapido(tipo: TipoLancamento)
  {
    this._router.navigate(['lancamentos/', tipo]);

  }

  get getSaldo()
  {
    if(this.contas && this.contas.length > 0)
    {
      
      let saldoIncial = this.contas.map(conta => conta.saldoInicial ).reduce((partial_sum, a) => partial_sum + a); 
      let lancamentosDespensa = 0;
      let lancamentosReceita = 0;
  
      this.contas.forEach(conta => {
  
        if(conta.lancamentos && conta.lancamentos.length > 0)
        {
          conta.lancamentos
            .filter(lancamento => lancamento.situacaoLancamento == "LIQUIDADO")
            .forEach(lancamento => {
              if(lancamento.tipo == "RECEITA")
                lancamentosReceita += lancamento.valorPago;
              else if (lancamento.tipo == "DESPESA")
                lancamentosDespensa += lancamento.valorPago;
              else
                lancamentosDespensa += lancamento.valorPago;        
          })
        }
  
      })
  
      return saldoIncial + lancamentosReceita - lancamentosDespensa;
    }

    return 0;
  }



}

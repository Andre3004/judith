import { LancamentFormComponent } from './../lancamento/lancament-form/lancament-form.component';
import { Component, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { ContaFormComponent } from '../conta/conta-form/conta-form.component';
import { TdDialogService } from '@covalent/core';

export interface Section {
  name: string;
  updated: Date;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
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

  folders: Section[] = [
    {
      name: 'Conta 1',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Conta 2',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Conta 3',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver, 
              public dialog: MatDialog,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) {}

  //CONTA
  openDialogFormConta(conta): void {
    const dialogRef = this.dialog.open(ContaFormComponent, {
      width: '600px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openConfirm(): void {
    this._dialogService.openConfirm({
      message: 'Tem certeza que deseja excluir esta conta ?',
      viewContainerRef: this._viewContainerRef,
      title: 'Excluir conta', 
      cancelButton: 'CANCELAR', 
      acceptButton: 'CONFIMAR',
      width: '500px',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // DO SOMETHING
      } 
    });
  }

  

}

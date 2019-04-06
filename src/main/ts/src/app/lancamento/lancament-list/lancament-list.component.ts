import { ContaService } from 'src/generated/services';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { TipoLancamentoValues } from 'src/generated/entities';
import { LancamentFormComponent } from '../lancament-form/lancament-form.component';

@Component({
  selector: 'app-lancament-list',
  templateUrl: './lancament-list.component.html',
  styleUrls: ['./lancament-list.component.scss']
})
export class LancamentListComponent implements OnInit
{

  public tipos = TipoLancamentoValues;

  public contas = [];

  constructor(public dialog: MatDialog, private contaService: ContaService) { console.log(this.currentYear) }

  ngOnInit()
  {
    this.onListAllContasWithoutUser();
  }

  private onListAllContasWithoutUser(): any
  {
    this.contaService.listAllContas().subscribe( contas => {
      this.contas = contas;
    })
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

  //todo adicionar lancamentos
  folders: any[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: any[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

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
  }

  public onOpenDialogLancamento(receita)
  {
    const dialogRef = this.dialog.open(LancamentFormComponent, {
      width: '1000px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      console.log('The dialog was closed');
    });
  }


}

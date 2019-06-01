import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { TerceiroService } from 'src/generated/services';
import { OpenSnackBarService } from 'src/app/open-snackbar/open-snackbar.service';
import { MatDialog } from '@angular/material';
import { TerceiroFormComponent } from '../teceiro-form/terceiro-form.component';

@Component({
  selector: 'app-terceiro-list',
  templateUrl: './terceiro-list.component.html',
  styleUrls: ['./terceiro-list.component.scss']
})
export class TerceiroListComponent implements OnInit
{

  public terceiros: any = [];

  columns: ITdDataTableColumn[] = [
    { name: 'nome',  label: 'Nome' },
    { name: 'tipoPessoa', label: 'Tipo' },
    { name: 'documento', label: 'Documento'},
    { name: 'opcoes', label: 'Opções'},
  ];
  
  constructor(public dialog: MatDialog, private openSnackBarService: OpenSnackBarService, private terceiroService: TerceiroService,private _dialogService: TdDialogService){ }

  ngOnInit()
  {
   this.listTerceirosByFilters();
  }

  listTerceirosByFilters()
  {
    this.terceiroService.listTerceiros().subscribe( terceiros => {
      this.terceiros = terceiros;
    })
  }

  public onOpenDialog(terceiro)
  {
    const dialogRef = this.dialog.open(TerceiroFormComponent, {
      width: '1100px',
      height: 'auto',
      data: {terceiro: terceiro}
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      this.listTerceirosByFilters();
    });
  }

  onRemove(terceiro)
  {
      this._dialogService.openConfirm({
        message: 'Tem certeza que deseja excluir este terceiro?',
        title: 'Excluir terceiro',
        cancelButton: 'CANCELAR',
        acceptButton: 'CONFIMAR',
        width: '500px',
      }).afterClosed().subscribe((accept: boolean) =>
      {
        if (accept)
        {
          this.terceiroService.deleteTerceiro(terceiro.id).subscribe(result =>
          {
            this.openSnackBarService.open("Terceiro excluído com sucesso!");
  
            this.listTerceirosByFilters();
          }, err => this.openSnackBarService.open(err.message))
        }
      });
    }
 
}

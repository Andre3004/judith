import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Endereco, Terceiro } from 'src/generated/entities';
import { TerceiroService } from 'src/generated/services';
import { OpenSnackBarService } from 'src/app/open-snackbar/open-snackbar.service';

@Component({
  selector: 'app-terceiro-form',
  templateUrl: './terceiro-form.component.html',
  styleUrls: ['./terceiro-form.component.scss']
})
export class TerceiroFormComponent implements OnInit
{


  public enderecos: Endereco[] = [];

  public terceiro: Terceiro = {};

  constructor(public dialogRef: MatDialogRef<TerceiroFormComponent>,
    private terceiroService: TerceiroService,
    private openSnackBarService: OpenSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    if (this.data.terceiro)
      this.terceiro = Object.assign({}, this.data.terceiro);

    this.onListAllEnderecos();
  }

  onNoClick(form): void
  {
    let terceiro = Object.assign({}, this.terceiro);
    if (terceiro.id)
      this.terceiroService.updateTerceiro(terceiro).subscribe(result =>
      {
        this.openSnackBarService.open("Terceiro atualizada com sucesso!");
        this.dialogRef.close(this.terceiro);
      }, err => this.openSnackBarService.open(err.message))
    else
      this.terceiroService.insertTerceiro(terceiro).subscribe(result =>
      {
        this.openSnackBarService.open("Terceiro cadastrada com sucesso!");
        this.dialogRef.close(this.terceiro);
      }, err => this.openSnackBarService.open(err.message))


  }


  private onListAllEnderecos()
  {
    this.terceiroService.listEnderecos().subscribe(enderecos =>
    {
      this.enderecos = enderecos;
    }, err => console.log(err))
  }

  public compareObjects(o1: any, o2: any): boolean
  {
    return o1.id == o2.id;
  }
}

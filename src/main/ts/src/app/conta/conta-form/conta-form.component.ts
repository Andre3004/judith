import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { ContaService } from './../../../generated/services';
import { TipoContaValues, Banco, Conta } from './../../../generated/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.scss']
})
export class ContaFormComponent implements OnInit
{

  public tipos = TipoContaValues;

  public bancos: Banco[] = [];

  public conta: Conta = {};

  constructor(public dialogRef: MatDialogRef<ContaFormComponent>,
    private contaService: ContaService,
    private openSnackBarService: OpenSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    if (this.data.conta)
      this.conta = Object.assign({}, this.data.conta);

    this.onListAllBancos();
  }

  onNoClick(form): void
  {
    let conta = Object.assign({}, this.conta);
    if (conta.id)
      this.contaService.updateConta(conta).subscribe(result =>
      {
        this.openSnackBarService.open("Conta atualizada com sucesso!");
        this.dialogRef.close(this.conta);
      }, err => this.openSnackBarService.open(err.message))
    else
      this.contaService.insertConta(conta).subscribe(result =>
      {
        this.openSnackBarService.open("Conta cadastrada com sucesso!");
        this.dialogRef.close(this.conta);
      }, err => this.openSnackBarService.open(err.message))


  }
 

  private onListAllBancos()
  {
    this.contaService.listAllBancos().subscribe(bancos =>
    {
    this.bancos = bancos
    }, err => console.log(err))
  }

  public compareObjects(o1: any, o2: any): boolean
  {
    return o1.id == o2.id;
  }
}

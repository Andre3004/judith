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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
    if(this.data.conta)
      this.conta = Object.assign({}, this.data.conta) ;

    this.onListAllBancos();
  }

  onNoClick(): void
  {
    this.dialogRef.close(this.conta);
  }

  private onListAllBancos()
  {
    this.contaService.listAllBancos().subscribe(bancos => this.bancos = bancos, err => console.log(err))
  }

  public compareObjects(o1: any, o2: any): boolean {
    return o1.id == o2.id;
  }
}

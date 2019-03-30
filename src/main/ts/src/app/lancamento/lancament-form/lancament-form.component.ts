import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TipoContaValues, TipoLancamentoValues, PeriodoValues } from 'src/generated/entities';

@Component({
  selector: 'app-lancament-form',
  templateUrl: './lancament-form.component.html',
  styleUrls: ['./lancament-form.component.scss']
})
export class LancamentFormComponent implements OnInit {

  public tipos = TipoLancamentoValues;

  public periodos = PeriodoValues;
  
  constructor( public dialogRef: MatDialogRef<LancamentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

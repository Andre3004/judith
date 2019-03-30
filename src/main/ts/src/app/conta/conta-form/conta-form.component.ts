import { TipoContaValues } from './../../../generated/entities';
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
  
  constructor( public dialogRef: MatDialogRef<ContaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit()
  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

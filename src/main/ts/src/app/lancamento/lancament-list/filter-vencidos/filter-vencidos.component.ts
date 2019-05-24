import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    templateUrl: 'filter-vencidos.component.html',
})
export class FilterVencidosComponent
{
    constructor(private bottomSheetRef: MatBottomSheetRef<FilterVencidosComponent>) { }

    openLink(dias: number): void
    {
        this.bottomSheetRef.dismiss(dias);
    }
}
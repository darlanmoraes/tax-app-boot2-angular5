import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  template: `
  <h4>Remover o Cliente?</h4>
  <button mat-raised-button (click)="dialogRef.close('no')">Não</button>
  <button mat-raised-button (click)="dialogRef.close('yes')">Sim</button>`
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }
}

import { Component, Inject } from '@angular/core';
import {  MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [
  MatButtonModule,
  MatDialogModule
],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss'
})
export class SuccessDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

}
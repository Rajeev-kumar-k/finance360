import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-claim-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './view-claim-dialog.html',
  styleUrl: './view-claim-dialog.scss'
})
export class ViewClaimDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

}
import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-travel-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './view-travel-dialog.html',
  styleUrl: './view-travel-dialog.scss'
})
export class ViewTravelDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

}
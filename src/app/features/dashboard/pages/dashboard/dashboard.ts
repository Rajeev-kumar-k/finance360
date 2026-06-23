import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatDialog } from '@angular/material/dialog';

import { ClaimService } from '../../../../core/services/claim';

import { ViewClaimDialog } from '../../../../shared/components/view-claim-dialog/view-claim-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  claims: any[] = [];

  isLoading = true;

  selectedYear = new Date().getFullYear();

  selectedMonth = new Date().toLocaleString(
    'default',
    {
      month: 'long'
    }
  );

  years = [
    2024,
    2025,
    2026
  ];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(
    private claimService: ClaimService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.loadClaims();

  }

  loadClaims() {

    this.isLoading = true;

    this.claimService
      .getClaims()
      .subscribe({

        next: (data: any) => {

          console.log(
            'Claims API Response:',
            data
          );

          this.claims = data;

          this.isLoading = false;

        },

        error: (err) => {

          console.error(
            'Claims API Error:',
            err
          );

          this.isLoading = false;

        }

      });

  }

  get totalRaised() {

    return this.claims.reduce(
      (
        sum,
        claim
      ) =>
        sum +
        Number(
          claim.total_amount
        ),
      0
    );

  }

  get totalPending() {

    return this.claims
      .filter(
        claim =>
          claim.status ===
          'Pending'
      )
      .reduce(
        (
          sum,
          claim
        ) =>
          sum +
          Number(
            claim.total_amount
          ),
        0
      );

  }

  get totalApproved() {

    return this.claims
      .filter(
        claim =>
          claim.status ===
          'Approved'
      )
      .reduce(
        (
          sum,
          claim
        ) =>
          sum +
          Number(
            claim.total_amount
          ),
        0
      );

  }

  viewClaim(
    id: number
  ) {

    this.claimService
      .getClaimById(id)
      .subscribe({

        next: (
          claim: any
        ) => {

          this.dialog.open(
            ViewClaimDialog,
            {
              width: '1000px',
              maxHeight: '90vh',
              data: claim
            }
          );

        },

        error: (
          err
        ) => {

          console.error(
            'Failed to load claim',
            err
          );

        }

      });

  }

}
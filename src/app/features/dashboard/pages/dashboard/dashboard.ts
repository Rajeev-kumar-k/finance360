import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatDialog } from '@angular/material/dialog';

import { ClaimService } from '../../../../core/services/claim';
import { TravelService }
from '../../../../core/services/travel';

import { ViewClaimDialog } from '../../../../shared/components/view-claim-dialog/view-claim-dialog';

import {
  ViewTravelDialog
}
from
'../../../../shared/components/view-travel-dialog/view-travel-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  claims: any[] = [];
  travelRequests: any[] = [];

  isLoading = true;
  searchText = '';
  selectedStatus = 'All';

  selectedYear = 0;

  selectedMonth = '';


  statuses = [
  'All',
  'Raised',
  'Pending',
  'Approved',
  'Rejected'
];

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
    private travelService: TravelService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadClaims();
    this.loadTravelRequests();

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

  this.claims = [...data].sort(
  (a, b) =>
    new Date(b.submission_date).getTime() -
    new Date(a.submission_date).getTime()
);

    console.log(
    'Before isLoading:',
    this.isLoading
  );

  this.cdr.detectChanges();
  console.log(
  'Change detection triggered'
);

  this.isLoading = false;

    console.log(
    'After isLoading:',
    this.isLoading
  );

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

  loadTravelRequests() {

  this.travelService
    .getTravelRequests()
    .subscribe({

      next: (data: any) => {

        console.log(
          'Travel Requests:',
          data
        );

        this.travelRequests =
          data;

      },

      error: (err) => {

        console.error(
          'Travel Request Error:',
          err
        );

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
             width: '1150px',
              maxWidth: '95vw',
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

  viewTravelRequest(
  id: number
) {

  this.travelService
    .getTravelRequestById(id)
    .subscribe({

      next: (travel) => {

        this.dialog.open(
          ViewTravelDialog,
          {
             width: '1150px',
              maxWidth: '95vw',
              maxHeight: '90vh',
            data: travel
          }
        );

      }

    });

}

get filteredClaims() {

  let filtered = this.claims;

  // Search Filter

  if (this.searchText) {

    const search =
      this.searchText.toLowerCase();

    filtered =
      filtered.filter(claim =>

        claim.report_id
          ?.toLowerCase()
          .includes(search)

        ||

        claim.status
          ?.toLowerCase()
          .includes(search)

        ||

        claim.employee_name
          ?.toLowerCase()
          .includes(search)

      );

  }

  // Status Filter

  if (
    this.selectedStatus !== 'All'
  ) {

    filtered =
      filtered.filter(
        claim =>
          claim.status ===
          this.selectedStatus
      );

  }

  // Year Filter

  if (this.selectedYear) {

    filtered =
      filtered.filter(claim => {

        const claimYear =
          new Date(
            claim.submission_date
          ).getFullYear();

        return (
          claimYear ===
          this.selectedYear
        );

      });

  }

  // Month Filter

  if (this.selectedMonth) {

    filtered =
      filtered.filter(claim => {

        const claimMonth =
          new Date(
            claim.submission_date
          ).toLocaleString(
            'default',
            {
              month: 'long'
            }
          );

        return (
          claimMonth ===
          this.selectedMonth
        );

      });

  }

  return filtered;

}
}
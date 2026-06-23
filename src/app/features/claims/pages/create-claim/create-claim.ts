import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialog } from '../../../../shared/components/success-dialog/success-dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { OnInit } from '@angular/core';
import { ClaimService } from '../../../../core/services/claim';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './create-claim.html',
  styleUrl: './create-claim.scss',
})
export class CreateClaim implements OnInit {

   constructor(
  private dialog: MatDialog,
  private claimService: ClaimService
) {}

selectedFile!: File;

ngOnInit(): void {

  console.log('Calling employee API...');

  this.claimService
    .getEmployeeProfile()
    .subscribe({
      next: (profile) => {

        console.log('API Response:', profile);

        this.employee = profile.employee;
        this.department = profile.department;
        this.manager = profile.manager;
        this.costCenters = profile.cost_centers;
      },

      error: (err) => {
        console.error('API Error:', err);
      }
    });

}

  employee = 'Rajeev Kumar';

  department = 'Technology Consulting';

  manager = 'Arjun Dev';

  status = 'Draft';

  submissionDate = new Date();

  totalAmount = '';

  businessPurpose = '';

  costCenters = [
    'CC-100',
    'CC-200',
    'CC-300'
  ];

  selectedCostCenter = '';

  currentStep = 1;

expenseItems: any[] = [];

expense = {
  reportId: 'RPT-' + Math.floor(Math.random() * 100000),
  date: new Date().toISOString().split('T')[0],
  category: '',
  merchant: '',
  amount: '',
  description: ''
};

categories = [
  'Travel',
  'Food',
  'Hotel',
  'Fuel',
  'Office Supplies',
  'Training'
];

nextStep() {
  this.currentStep = 2;
}

backStep() {
  this.currentStep = 1;
}

addItem() {

  if (
    !this.expense.category ||
    !this.expense.merchant ||
    !this.expense.amount
  ) {
    return;
  }

  this.expenseItems.push({
    id: this.expenseItems.length + 1,
    ...this.expense
  });

  this.expense = {
    reportId: this.expense.reportId,
    date: this.expense.date,
    category: '',
    merchant: '',
    amount: '',
    description: ''
  };
}

get totalExpense() {
  return this.expenseItems.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );
}

onFileSelected(
  event: any
) {

  if (
    event.target.files &&
    event.target.files.length > 0
  ) {

    this.selectedFile =
      event.target.files[0];

    console.log(
      'Selected File:',
      this.selectedFile.name
    );

  }

}

removeItem(index: number) {
  this.expenseItems.splice(index, 1);
}

submitClaim() {

  const payload = {

    report_id:
      this.expense.reportId,

    employee_name:
      this.employee,

    employee_id:
      'EMP-001',

    department:
      this.department,

    manager:
      this.manager,

    business_purpose:
      this.businessPurpose,

    cost_center:
      this.selectedCostCenter,

    submission_date:
      new Date()
        .toISOString()
        .split('T')[0],

    total_amount:
      Number(this.totalExpense),

    status:
      'Raised',

    expense_items:
      this.expenseItems.map(item => ({

        expense_date:
          item.date,

        category:
          item.category,

        merchant:
          item.merchant,

        amount:
          Number(item.amount),

        description:
          item.description

      }))

  };

  this.claimService
    .createClaim(payload)
    .subscribe({

      next: (claimResponse: any) => {

        console.log(
          'Claim Created:',
          claimResponse
        );

        // No file selected
        if (!this.selectedFile) {

          this.showSuccessDialog(
            claimResponse.id
          );

          return;
        }

        // Upload file
        this.claimService
          .uploadAttachment(
            claimResponse.id,
            this.selectedFile
          )
          .subscribe({

            next: () => {

              console.log(
                'Attachment Uploaded'
              );

              this.showSuccessDialog(
                claimResponse.id
              );

            },

            error: (err) => {

              console.error(
                'Attachment Upload Failed',
                err
              );

            }

          });

      },

      error: (err) => {

        console.error(
          'Claim Creation Failed',
          err
        );

      }

    });

}

showSuccessDialog(
  claimId: number
) {

  this.dialog.open(
    SuccessDialog,
    {
      width: '500px',
      data: {
        reportId: claimId
      }
    }
  );

}

openSuccessDialog(
  claimId: number
) {

  this.dialog.open(
    SuccessDialog,
    {
      width: '500px',
      disableClose: false,
      data: {
        reportId: claimId
      }
    }
  );

}

saveDraft() {

  const draftPayload = {

    employee_id: 'EMP-001',

    draft_json: JSON.stringify({

      businessPurpose:
        this.businessPurpose,

      selectedCostCenter:
        this.selectedCostCenter,

      totalAmount:
        this.totalAmount,

      expenseItems:
        [...this.expenseItems],

      expense: {
        ...this.expense
      }

    })

  };

  console.log(
    'Saving Draft:',
    draftPayload
  );

  this.claimService
    .saveDraft(draftPayload)
    .subscribe({

      next: () => {

        alert(
          'Draft Saved Successfully'
        );

      },

      error: (err) => {

        console.error(
          'Save Draft Error:',
          err
        );

      }

    });

}


loadDraft() {

  this.claimService
    .loadDraft('EMP-001')
    .subscribe({

      next: (response: any) => {

        const draft =
          JSON.parse(
            response.draft_json
          );

        console.log(
          'Draft Loaded:',
          draft
        );

        this.businessPurpose =
          draft.businessPurpose || '';

        this.selectedCostCenter =
          draft.selectedCostCenter || '';

        this.totalAmount =
          draft.totalAmount || '';

        this.expenseItems = [
          ...(draft.expenseItems || [])
        ];

        this.expense = {
          reportId:
            draft.expense?.reportId || '',

          date:
            draft.expense?.date ||
            new Date()
              .toISOString()
              .split('T')[0],

          category:
            draft.expense?.category || '',

          merchant:
            draft.expense?.merchant || '',

          amount:
            draft.expense?.amount || '',

          description:
            draft.expense?.description || ''
        };

        console.log(
          'Expense Items Restored:',
          this.expenseItems
        );

        console.log(
          'Expense Restored:',
          this.expense
        );

        alert(
          'Draft Loaded Successfully'
        );

      },

      error: (err) => {

        console.error(
          'Load Draft Error:',
          err
        );

      }

    });

}
}
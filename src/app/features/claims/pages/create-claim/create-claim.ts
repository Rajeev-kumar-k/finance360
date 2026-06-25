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
import { ChangeDetectorRef } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-claim.html',
  styleUrl: './create-claim.scss',
})
export class CreateClaim implements OnInit {

   constructor(
  private dialog: MatDialog,
  private claimService: ClaimService,
   private cdr: ChangeDetectorRef
) {}

selectedFiles: File[] = [];

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

  employee = 'Employee X';

  department = 'EDS';

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
  !this.expense.reportId ||
  !this.expense.date ||
  !this.expense.category ||
  !this.expense.merchant ||
  !this.expense.amount
) {

  alert(
    'Please fill all required fields'
  );

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

  const files =
    Array.from(
      event.target.files
    ) as File[];

  this.selectedFiles.push(
    ...files
  );

  console.log(
    'Selected Files:',
    this.selectedFiles
  );

  console.log(
    'Files Count:',
    this.selectedFiles.length
  );

}

removeItem(index: number) {
  this.expenseItems.splice(index, 1);
}

submitClaim() {

  if (!this.selectedCostCenter) {

    alert(
      'Please select a Cost Center'
    );

    return;

  }

  if (!this.businessPurpose.trim()) {

    alert(
      'Please enter Purpose of Visit / Expense'
    );

    return;

  }

  if (this.expenseItems.length === 0) {

    alert(
      'Please add at least one Expense Item'
    );

    return;

  }

  if (this.selectedFiles.length === 0){

    alert(
      'Please upload a receipt'
    );

    return;

  }

  const payload = {

    

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
        let uploadedCount = 0;

for (const file of this.selectedFiles) {

  this.claimService
    .uploadAttachment(
      claimResponse.id,
      file
    )
    .subscribe({

      next: () => {

        uploadedCount++;

        console.log(
          'Attachment Uploaded:',
          file.name
        );

        if (
          uploadedCount ===
          this.selectedFiles.length
        ) {

          this.showSuccessDialog(
            claimResponse.report_id
          );

        }

      },

      error: (err) => {

        console.error(
          'Attachment Upload Failed',
          err
        );

      }

    });

}

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
  reportId: string
) {

  const dialogRef =
    this.dialog.open(
      SuccessDialog,
      {
        width: '500px',
        disableClose: false,
        data: {
           reportId: reportId
        }
      }
    );

dialogRef
  .afterClosed()
  .subscribe(() => {

    console.log(
      'DIALOG CLOSED'
    );

    setTimeout(() => {

      this.resetForm();

    }, 0);

  });

}

resetForm() {

  console.log('RESET FORM CALLED');

   console.log('BEFORE RESET:', this.currentStep);

  this.currentStep = 1;
    console.log('AFTER RESET:', this.currentStep);

  this.businessPurpose = '';

  this.selectedCostCenter = '';

  this.totalAmount = '';

  this.expenseItems = [];

  this.selectedFiles = [];

  this.expense = {

    reportId:
      'RPT-' +
      Math.floor(
        Math.random() * 100000
      ),

    date:
      new Date()
        .toISOString()
        .split('T')[0],

    category: '',

    merchant: '',

    amount: '',

    description: ''

  };

   this.cdr.detectChanges();


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
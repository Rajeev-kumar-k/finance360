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
export class CreateClaim {

   constructor(
    private dialog: MatDialog
  ) {}

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

removeItem(index: number) {
  this.expenseItems.splice(index, 1);
}

submitClaim() {

  this.dialog.open(
    SuccessDialog,
    {
      width: '500px',
      disableClose: false,
      data: {
        reportId: this.expense.reportId
      }
    }
  );

}

}
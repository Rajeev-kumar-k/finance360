import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Chatbot }
from '../../../../shared/components/chatbot/chatbot';

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Chatbot
  ],
  templateUrl: './help-center.html',
  styleUrl: './help-center.scss'
})
export class HelpCenter {

  searchText = '';

  selectedCategory = 'Reimbursement';

  categories = [
    'Reimbursement',
    'Approvals',
    'Others'
  ];

  faqs = [
    {
      question: 'How do I submit an expense claim?',
      answer: 'Navigate to Create Claim and complete all required details.'
    },
    {
      question: 'What receipts are supported?',
      answer: 'JPG, PNG and PDF receipts are supported.'
    },
    {
      question: 'How do I save a draft?',
      answer: 'Use the Save Draft button available in the claim form.'
    }
  ];

}
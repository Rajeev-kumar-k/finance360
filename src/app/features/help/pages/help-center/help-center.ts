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
      category: 'Reimbursement',
      question: 'How do I submit an expense claim?',
      answer: 'Navigate to Create Claim and complete all required details.'
    },

    {
      category: 'Reimbursement',
      question: 'What receipts are supported?',
      answer: 'JPG, PNG and PDF receipts are supported.'
    },

    {
      category: 'Reimbursement',
      question: 'How do I save a draft?',
      answer: 'Use the Save Draft button available in the claim form.'
    },

    {
      category: 'Approvals',
      question: 'Who approves my expense claim?',
      answer: 'Your reporting manager reviews and approves your claim.'
    },

    {
      category: 'Approvals',
      question: 'How do I submit a travel request?',
      answer: 'Navigate to Travel Request and complete the required details before submitting.'
    },

    {
      category: 'Others',
      question: 'Can I edit a submitted claim?',
      answer: 'No. Once submitted, the claim cannot be edited.'
    }

  ];

  get filteredFaqs() {

    return this.faqs.filter(faq => {

      const categoryMatch =
        this.selectedCategory === 'All'
        || faq.category === this.selectedCategory;

      const search = this.searchText
        .toLowerCase()
        .trim();

      const searchMatch =
        search === ''
        ||
        faq.question
          .toLowerCase()
          .includes(search)
        ||
        faq.answer
          .toLowerCase()
          .includes(search);

      return (
        categoryMatch &&
        searchMatch
      );

    });

  }

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-travel-request',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './travel-request.html',
  styleUrl: './travel-request.scss',
})
export class TravelRequest {

  requestId =
    'TRV-' +
    Math.floor(
      10000 + Math.random() * 90000
    );

  employeeName =
    'Rajeev Kumar';

  
  employeeEmail =
  'rajeev.kumar@ey.com';

 gpn =
  'GPN123456';

  department =
    'Technology Consulting';

  manager =
    'Arjun Dev';

  destinationCity = '';
  destinationCountry = '';
  purpose = '';

  startDate = '';
  endDate = '';

  hotelCost = '';
  flightCost = '';
  localTravelCost = '';
  foodCost = '';

  remarks = '';

  approvalMail: File | null = null;

  onApprovalMailSelected(
    event: any
  ) {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      this.approvalMail =
        event.target.files[0];

    }

  }

  submitRequest() {

  if (!this.destinationCity.trim()) {

    alert(
      'Please enter Destination City'
    );

    return;

  }

  if (!this.destinationCountry.trim()) {

    alert(
      'Please enter Destination Country'
    );

    return;

  }

  if (!this.purpose.trim()) {

    alert(
      'Please enter Purpose of Travel'
    );

    return;

  }

  if (!this.startDate) {

    alert(
      'Please select Start Date'
    );

    return;

  }

  if (!this.endDate) {

    alert(
      'Please select End Date'
    );

    return;

  }

  if (!this.approvalMail) {

    alert(
      'Please upload Approval Mail'
    );

    return;

  }

  alert(
    'Travel Request Submitted Successfully'
  );

}

}
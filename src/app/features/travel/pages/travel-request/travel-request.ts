import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TravelService }
from '../../../../core/services/travel';

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

  constructor(
  private travelService: TravelService
) {}

  showDialog = false;

submittedRequestId = '';

  requestId =
    'TRV-' +
    Math.floor(
      10000 + Math.random() * 90000
    );

  employeeName =
    'Rajeev Kumar';

  employeeId=
    'EMP-001';

  
  employeeEmail =
  'rajeev.kumar@ey.com';

 gpn =
  'GPN123456';

  department =
    'Technology Consulting';

  projectCode=
  'PR001';
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

  const payload = {

    employee_name:
      this.employeeName,

    employee_email:
      this.employeeEmail,

    employee_id:
      this.employeeId,

    gpn:
      this.gpn,

    department:
      this.department,

    manager:
      this.manager,

    project_code:
      this.projectCode,

    destination_city:
      this.destinationCity,

    destination_country:
      this.destinationCountry,

    purpose:
      this.purpose,

    travel_start_date:
      this.startDate,

    travel_end_date:
      this.endDate,

    hotel_cost:
      Number(this.hotelCost || 0),

    flight_cost:
      Number(this.flightCost || 0),

    local_travel_cost:
      Number(this.localTravelCost || 0),

    food_cost:
      Number(this.foodCost || 0),

    remarks:
      this.remarks,

    status:
      'Submitted'
  };

  this.travelService
    .createTravelRequest(
      payload
    )
    .subscribe({

      next: (response: any) => {

        console.log(
          'Travel Request Created',
          response
        );

        this.travelService
          .uploadApprovalMail(
            response.id,
            this.approvalMail!
          )
          .subscribe({

            next: () => {

              console.log(
                'Approval Mail Uploaded'
              );

              this.showSuccessDialog(
                response.request_id
              );

            },

            error: (err) => {

              console.error(
                'Approval Mail Upload Failed',
                err
              );

            }

          });

      },

      error: (err) => {

        console.error(
          'Travel Request Creation Failed',
          err
        );

      }

    });

}

showSuccessDialog(
  requestId: string
) {

  this.submittedRequestId =
    requestId;

  this.showDialog = true;

  this.resetForm();

}
resetForm() {

  this.destinationCity = '';

  this.destinationCountry = '';

  this.purpose = '';

  this.startDate = '';

  this.endDate = '';

  this.hotelCost = '';

  this.flightCost = '';

  this.localTravelCost = '';

  this.foodCost = '';

  this.remarks = '';

  this.approvalMail = null;

}
}
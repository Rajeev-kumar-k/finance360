import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private apiUrl =
    'http://127.0.0.1:8000';

  constructor(
    private http: HttpClient
  ) {}

  createTravelRequest(
    payload: any
  ) {

    return this.http.post(
      `${this.apiUrl}/travel-requests`,
      payload
    );

  

  }

  uploadApprovalMail(
  requestId: number,
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    'file',
    file
  );

  return this.http.post(
    `${this.apiUrl}/travel-requests/${requestId}/approval-mail`,
    formData
  );

}

getTravelRequests() {

  return this.http.get(
    `${this.apiUrl}/travel-requests`
  );

}

getTravelRequestById(
  id: number
) {

  return this.http.get(
    `${this.apiUrl}/travel-requests/${id}`
  );

}

}
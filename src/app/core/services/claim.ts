import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'http://127.0.0.1:8000';
  

  constructor(
    private http: HttpClient
  ) {}

  getEmployeeProfile(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/employee/profile`
    );
  }

  getClaims(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/claims`
    );
  }

  getClaimById(id: number) {
  return this.http.get(
    `${this.apiUrl}/claims/${id}`
  );
}

  createClaim(payload: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/claims`,
      payload
    );
  }

  uploadAttachment(
  claimId: number,
  file: File
) {

  const formData = new FormData();

  formData.append(
    'file',
    file
  );

  return this.http.post(
    `${this.apiUrl}/claims/${claimId}/attachments`,
    formData
  );
}

saveDraft(payload: any) {

  return this.http.post(
    `${this.apiUrl}/drafts`,
    payload
  );

}

loadDraft(employeeId: string) {

  return this.http.get(
    `${this.apiUrl}/drafts/latest/${employeeId}`
  );

}

extractReceipt(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    'file',
    file
  );

  return this.http.post(
    `${this.apiUrl}/ai/extract-receipt`,
    formData
  );

}

}
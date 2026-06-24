import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequest } from './travel-request';

describe('TravelRequest', () => {
  let component: TravelRequest;
  let fixture: ComponentFixture<TravelRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelRequest],
    }).compileComponents();

    fixture = TestBed.createComponent(TravelRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

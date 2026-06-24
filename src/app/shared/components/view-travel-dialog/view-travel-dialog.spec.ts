import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelDialog } from './view-travel-dialog';

describe('ViewTravelDialog', () => {
  let component: ViewTravelDialog;
  let fixture: ComponentFixture<ViewTravelDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTravelDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTravelDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

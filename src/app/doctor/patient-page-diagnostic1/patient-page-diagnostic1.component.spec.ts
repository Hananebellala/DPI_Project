import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPageDiagnostic1Component } from './patient-page-diagnostic1.component';

describe('PatientPageDiagnostic1Component', () => {
  let component: PatientPageDiagnostic1Component;
  let fixture: ComponentFixture<PatientPageDiagnostic1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPageDiagnostic1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPageDiagnostic1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPageDiagnosticComponent } from './patient-page-diagnostic.component';

describe('PatientPageDiagnosticComponent', () => {
  let component: PatientPageDiagnosticComponent;
  let fixture: ComponentFixture<PatientPageDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientPageDiagnosticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientPageDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

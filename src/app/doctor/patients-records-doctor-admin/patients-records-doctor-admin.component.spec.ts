import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsRecordsDoctorAdminComponent } from './patients-records-doctor-admin.component';

describe('PatientsRecordsDoctorAdminComponent', () => {
  let component: PatientsRecordsDoctorAdminComponent;
  let fixture: ComponentFixture<PatientsRecordsDoctorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsRecordsDoctorAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsRecordsDoctorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

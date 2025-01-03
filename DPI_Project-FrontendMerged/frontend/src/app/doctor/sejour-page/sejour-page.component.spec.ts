import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SejourPageComponent } from './sejour-page.component';

describe('PatientPageDiagnosticComponent', () => {
  let component: SejourPageComponent;
  let fixture: ComponentFixture<SejourPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SejourPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SejourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
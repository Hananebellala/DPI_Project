import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConsultationComponent } from './all-consultation.component';

describe('AllConsultationComponent', () => {
  let component: AllConsultationComponent;
  let fixture: ComponentFixture<AllConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

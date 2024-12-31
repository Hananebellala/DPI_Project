import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCountPageComponent } from './blood-count.component';

describe('BloodCountPageComponent', () => {
  let component: BloodCountPageComponent;
  let fixture: ComponentFixture<BloodCountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodCountPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

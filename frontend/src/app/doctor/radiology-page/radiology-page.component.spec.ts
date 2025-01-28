import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyPageComponent } from './radiology-page.component';

describe('RadiologyPageComponent', () => {
  let component: RadiologyPageComponent;
  let fixture: ComponentFixture<RadiologyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

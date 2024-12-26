import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborantinPageComponent } from './laborantin-page.component';

describe('LaborantinPageComponent', () => {
  let component: LaborantinPageComponent;
  let fixture: ComponentFixture<LaborantinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborantinPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborantinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

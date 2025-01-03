import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologuePageComponent } from './radiologue-page.component';

describe('RadiologuePageComponent', () => {
  let component: RadiologuePageComponent;
  let fixture: ComponentFixture<RadiologuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologuePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

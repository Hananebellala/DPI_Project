import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinPageComponent } from './soin-page.component';

describe('SoinPageComponent', () => {
  let component: SoinPageComponent;
  let fixture: ComponentFixture<SoinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

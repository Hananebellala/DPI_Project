import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSejourComponent } from './add-sejour.component';

describe('AddSejourComponent', () => {
  let component: AddSejourComponent;
  let fixture: ComponentFixture<AddSejourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSejourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSejourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

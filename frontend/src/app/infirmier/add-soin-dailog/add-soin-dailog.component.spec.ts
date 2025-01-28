import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoinDailogComponent } from './add-soin-dailog.component';

describe('AddSoinDailogComponent', () => {
  let component: AddSoinDailogComponent;
  let fixture: ComponentFixture<AddSoinDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoinDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoinDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

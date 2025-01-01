import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoinsDialogComponent } from './add-soins-dialog.component';

describe('AddSoinsDialogComponent', () => {
  let component: AddSoinsDialogComponent;
  let fixture: ComponentFixture<AddSoinsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoinsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoinsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

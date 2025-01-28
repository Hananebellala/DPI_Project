import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersaddComponent } from './membersadd.component';

describe('MembersaddComponent', () => {
  let component: MembersaddComponent;
  let fixture: ComponentFixture<MembersaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

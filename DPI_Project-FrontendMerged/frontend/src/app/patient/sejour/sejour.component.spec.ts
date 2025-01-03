import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SejourPageComponent } from './sejour.component';

describe('SejourComponent', () => {
  let component: SejourPageComponent;
  let fixture: ComponentFixture<SejourPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SejourPageComponent]  // For standalone components
    })
    .compileComponents();

    fixture = TestBed.createComponent(SejourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalCalculationComponent } from './international-calculation.component';

describe('InternationalCalculationComponent', () => {
  let component: InternationalCalculationComponent;
  let fixture: ComponentFixture<InternationalCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternationalCalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternationalCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

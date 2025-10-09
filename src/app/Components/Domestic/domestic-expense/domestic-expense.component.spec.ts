import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticExpenseComponent } from './domestic-expense.component';

describe('DomesticExpenseComponent', () => {
  let component: DomesticExpenseComponent;
  let fixture: ComponentFixture<DomesticExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomesticExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomesticExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

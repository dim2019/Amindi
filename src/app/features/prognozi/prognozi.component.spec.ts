import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrognoziComponent } from './prognozi.component';

describe('PrognoziComponent', () => {
  let component: PrognoziComponent;
  let fixture: ComponentFixture<PrognoziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrognoziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrognoziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

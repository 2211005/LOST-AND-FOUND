import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdidoForm } from './perdido-form';

describe('PerdidoForm', () => {
  let component: PerdidoForm;
  let fixture: ComponentFixture<PerdidoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerdidoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerdidoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

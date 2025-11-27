import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncontradoForm } from './encontrado-form';

describe('EncontradoForm', () => {
  let component: EncontradoForm;
  let fixture: ComponentFixture<EncontradoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncontradoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncontradoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

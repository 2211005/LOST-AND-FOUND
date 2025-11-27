import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalleAdmin } from './reporte-detalle-admin';

describe('ReporteDetalleAdmin', () => {
  let component: ReporteDetalleAdmin;
  let fixture: ComponentFixture<ReporteDetalleAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteDetalleAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDetalleAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

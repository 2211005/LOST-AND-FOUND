import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesHome } from './reportes-home';

describe('ReportesHome', () => {
  let component: ReportesHome;
  let fixture: ComponentFixture<ReportesHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

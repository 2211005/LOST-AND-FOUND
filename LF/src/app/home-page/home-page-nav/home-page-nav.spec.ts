import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNav } from './home-page-nav';

describe('HomePageNav', () => {
  let component: HomePageNav;
  let fixture: ComponentFixture<HomePageNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

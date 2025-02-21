import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserNavbarComponent } from './logged-user-navbar.component';

describe('LoggedUserNavbarComponent', () => {
  let component: LoggedUserNavbarComponent;
  let fixture: ComponentFixture<LoggedUserNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedUserNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedUserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

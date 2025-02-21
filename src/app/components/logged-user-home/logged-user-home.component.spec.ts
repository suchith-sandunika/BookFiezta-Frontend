import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserHomeComponent } from './logged-user-home.component';

describe('LoggedUserHomeComponent', () => {
  let component: LoggedUserHomeComponent;
  let fixture: ComponentFixture<LoggedUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedUserHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

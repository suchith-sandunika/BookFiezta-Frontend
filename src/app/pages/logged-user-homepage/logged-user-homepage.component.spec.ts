import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserHomepageComponent } from './logged-user-homepage.component';

describe('LoggedUserHomepageComponent', () => {
  let component: LoggedUserHomepageComponent;
  let fixture: ComponentFixture<LoggedUserHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedUserHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

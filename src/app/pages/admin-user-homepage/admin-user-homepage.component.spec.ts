import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserHomepageComponent } from './admin-user-homepage.component';

describe('AdminUserHomepageComponent', () => {
  let component: AdminUserHomepageComponent;
  let fixture: ComponentFixture<AdminUserHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

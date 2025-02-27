import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBookComponent } from './admin-view-book.component';

describe('AdminViewBookComponent', () => {
  let component: AdminViewBookComponent;
  let fixture: ComponentFixture<AdminViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

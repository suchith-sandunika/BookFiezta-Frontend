import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBookComponent } from './admin-add-book.component';

describe('AdminAddBookComponent', () => {
  let component: AdminAddBookComponent;
  let fixture: ComponentFixture<AdminAddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

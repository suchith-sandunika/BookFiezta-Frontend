import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageBooksComponent } from './admin-manage-books.component';

describe('AdminManageBooksComponent', () => {
  let component: AdminManageBooksComponent;
  let fixture: ComponentFixture<AdminManageBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

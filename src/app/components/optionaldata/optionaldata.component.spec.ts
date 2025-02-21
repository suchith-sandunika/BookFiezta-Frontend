import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionaldataComponent } from './optionaldata.component';

describe('OptionaldataComponent', () => {
  let component: OptionaldataComponent;
  let fixture: ComponentFixture<OptionaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionaldataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

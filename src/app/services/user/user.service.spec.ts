import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service'; // Ensure the file exists at this path

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

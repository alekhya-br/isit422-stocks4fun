import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('CrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: CrudService = TestBed.get(CrudService);
    expect(service).toBeTruthy();
  });
});

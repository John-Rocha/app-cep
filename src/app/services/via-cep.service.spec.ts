import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ViaCepService } from './via-cep.service';
import { Address } from '../models/address.model';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViaCepService],
    });
    service = TestBed.inject(ViaCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch address by CEP', () => {
    const mockAddress: Address = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    service.getAddressByCep('01001000').subscribe((address: Address) => {
      expect(address).toEqual(mockAddress);
    });

    const req = httpMock.expectOne('https://viacep.com.br/ws/01001000/json/');
    expect(req.request.method).toBe('GET');
    req.flush(mockAddress);
  });

  it('should handle invalid CEP error', (done) => {
    service.getAddressByCep('00000000').subscribe(
      () => fail('should have failed with error'),
      (error: Error) => {
        expect(error.message).toBe('CEP não encontrado');
        done();
      }
    );

    const req = httpMock.expectOne('https://viacep.com.br/ws/00000000/json/');
    req.flush({ erro: true });
  });

  it('should format CEP correctly', () => {
    expect(service.formatCep('01001000')).toBe('01001-000');
    expect(service.formatCep('01001-000')).toBe('01001-000');
  });
});

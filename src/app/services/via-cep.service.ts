import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  private readonly API_URL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  /**
   * Busca um endereço pelo CEP
   * @param cep - CEP a ser consultado (com ou sem formatação)
   * @returns Observable com os dados do endereço
   */
  getAddressByCep(cep: string): Observable<Address> {
    const cleanCep = this.cleanCep(cep);

    if (!this.isValidCep(cleanCep)) {
      return throwError(() => new Error('CEP inválido'));
    }

    return this.http.get<Address>(`${this.API_URL}/${cleanCep}/json/`).pipe(
      map((response) => {
        if (response.erro) {
          throw new Error('CEP não encontrado');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Remove caracteres não numéricos do CEP
   * @param cep - CEP a ser limpo
   * @returns CEP contendo apenas números
   */
  private cleanCep(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  /**
   * Valida o formato do CEP
   * @param cep - CEP a ser validado (apenas números)
   * @returns true se o CEP é válido
   */
  private isValidCep(cep: string): boolean {
    return /^[0-9]{8}$/.test(cep);
  }

  /**
   * Trata erros de requisição HTTP
   * @param error - Erro capturado
   * @returns Observable de erro
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro ao buscar o CEP';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status === 0) {
      // Erro de rede
      errorMessage = 'Erro de conexão. Verifique sua internet.';
    } else {
      // Erro do lado do servidor
      errorMessage = error.message || errorMessage;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Formata o CEP no padrão XXXXX-XXX
   * @param cep - CEP a ser formatado
   * @returns CEP formatado
   */
  formatCep(cep: string): string {
    const cleanCep = this.cleanCep(cep);
    if (cleanCep.length === 8) {
      return `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;
    }
    return cep;
  }
}

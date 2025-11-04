import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViaCepService } from '../../services/via-cep.service';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-cep-search',
  templateUrl: './cep-search.component.html',
  styleUrls: ['./cep-search.component.css'],
})
export class CepSearchComponent {
  searchForm: FormGroup;
  address: Address | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
    });
  }

  /**
   * Busca o endereço pelo CEP informado
   */
  searchCep(): void {
    if (this.searchForm.invalid) {
      this.errorMessage =
        'Por favor, insira um CEP válido no formato XXXXX-XXX ou XXXXXXXX';
      return;
    }

    const cep = this.searchForm.get('cep')?.value;
    this.isLoading = true;
    this.errorMessage = '';
    this.address = null;

    this.viaCepService.getAddressByCep(cep).subscribe({
      next: (data: Address) => {
        this.address = data;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  /**
   * Navega para a página de detalhes do CEP
   */
  viewDetails(): void {
    if (this.address) {
      const cleanCep = this.address.cep.replace(/\D/g, '');
      this.router.navigate(['/cep', cleanCep]);
    }
  }

  /**
   * Limpa o formulário e resultados
   */
  clear(): void {
    this.searchForm.reset();
    this.address = null;
    this.errorMessage = '';
  }

  /**
   * Formata o CEP enquanto o usuário digita
   */
  formatCepInput(): void {
    const cepControl = this.searchForm.get('cep');
    if (cepControl) {
      let value = cepControl.value.replace(/\D/g, '');
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      if (value.length > 5) {
        value = `${value.slice(0, 5)}-${value.slice(5)}`;
      }
      cepControl.setValue(value, { emitEvent: false });
    }
  }
}

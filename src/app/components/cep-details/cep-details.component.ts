import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViaCepService } from '../../services/via-cep.service';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-cep-details',
  templateUrl: './cep-details.component.html',
  styleUrls: ['./cep-details.component.css'],
})
export class CepDetailsComponent implements OnInit {
  address: Address | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;
  cep: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cep = params['cep'];
      if (this.cep) {
        this.loadAddressDetails();
      } else {
        this.errorMessage = 'CEP não informado';
        this.isLoading = false;
      }
    });
  }

  /**
   * Carrega os detalhes do endereço
   */
  private loadAddressDetails(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.viaCepService.getAddressByCep(this.cep).subscribe({
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
   * Volta para a página de busca
   */
  goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Busca um novo CEP
   */
  searchNewCep(): void {
    this.router.navigate(['/']);
  }

  /**
   * Retorna o endereço formatado completo
   */
  getFullAddress(): string {
    if (!this.address) return '';

    const parts = [
      this.address.logradouro,
      this.address.complemento,
      this.address.bairro,
      this.address.localidade,
      this.address.uf,
    ].filter((part) => part && part.trim() !== '');

    return parts.join(', ');
  }

  /**
   * Copia o endereço para a área de transferência
   */
  copyAddress(): void {
    const fullAddress = this.getFullAddress();
    navigator.clipboard.writeText(fullAddress).then(() => {
      alert('Endereço copiado para a área de transferência!');
    });
  }
}

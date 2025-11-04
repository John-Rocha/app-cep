# Documentação Técnica - App CEP

## Arquitetura da Aplicação

Esta aplicação segue o padrão de arquitetura do Angular, utilizando:

- **Componentes** para a interface do usuário
- **Serviços** para lógica de negócios e integração com APIs
- **Models** para tipagem de dados
- **Routing** para navegação entre páginas
- **Reactive Forms** para gerenciamento de formulários

## Componentes

### 1. AppComponent (Raiz)

**Arquivo**: `src/app/app.component.ts`

Componente principal que serve como container para toda a aplicação. Contém apenas o `<router-outlet>` para renderizar as rotas.

### 2. CepSearchComponent

**Arquivos**: `src/app/components/cep-search/`

**Responsabilidades:**

- Exibir formulário de busca de CEP
- Validar formato do CEP (8 dígitos)
- Formatar CEP automaticamente (adiciona hífen)
- Exibir resultados da busca
- Gerenciar estados de loading e erro
- Navegação para página de detalhes

**Métodos principais:**

- `searchCep()`: Busca o endereço pelo CEP
- `formatCepInput()`: Formata o CEP enquanto o usuário digita
- `viewDetails()`: Navega para a página de detalhes
- `clear()`: Limpa o formulário e resultados

### 3. CepDetailsComponent

**Arquivos**: `src/app/components/cep-details/`

**Responsabilidades:**

- Carregar dados do CEP a partir da URL
- Exibir todos os detalhes do endereço
- Permitir copiar endereço completo
- Navegação de volta para busca

**Métodos principais:**

- `ngOnInit()`: Carrega os dados ao inicializar
- `loadAddressDetails()`: Busca os dados do CEP
- `getFullAddress()`: Retorna o endereço formatado completo
- `copyAddress()`: Copia o endereço para área de transferência
- `goBack()`: Volta para página de busca

## Serviços

### ViaCepService

**Arquivo**: `src/app/services/via-cep.service.ts`

**Responsabilidades:**

- Integração com API ViaCEP
- Validação de CEP
- Limpeza e formatação de CEP
- Tratamento de erros HTTP

**Métodos públicos:**

- `getAddressByCep(cep: string): Observable<Address>` - Busca endereço por CEP
- `formatCep(cep: string): string` - Formata CEP no padrão XXXXX-XXX

**Métodos privados:**

- `cleanCep(cep: string): string` - Remove caracteres não numéricos
- `isValidCep(cep: string): boolean` - Valida formato do CEP
- `handleError(error: HttpErrorResponse): Observable<never>` - Trata erros

**Tratamento de Erros:**

- CEP inválido (formato incorreto)
- CEP não encontrado (retornado pela API)
- Erro de rede (sem conexão)
- Erro do servidor

## Models

### Address Interface

**Arquivo**: `src/app/models/address.model.ts`

Define a estrutura de dados retornada pela API ViaCEP:

```typescript
interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}
```

## Rotas

### Configuração

**Arquivo**: `src/app/app-routing.module.ts`

```typescript
const routes: Routes = [
  { path: "", component: CepSearchComponent },
  { path: "cep/:cep", component: CepDetailsComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
```

- **/** - Página inicial com busca
- **/cep/:cep** - Página de detalhes (parâmetro dinâmico)
- **\*\*** - Qualquer rota inválida redireciona para a home

## Validações

### Validação de CEP

O CEP é validado em duas camadas:

1. **No formulário** (Frontend):

   - Validators.required
   - Validators.pattern(/^\d{5}-?\d{3}$/)

2. **No serviço** (Backend):
   - Formato: deve ter exatamente 8 dígitos
   - Remove caracteres especiais automaticamente

### Regex Pattern

```typescript
/^\d{5}-?\d{3}$/;
```

- `\d{5}` - 5 dígitos
- `-?` - Hífen opcional
- `\d{3}` - 3 dígitos

## Estilos

### Estrutura CSS

1. **Global** (`src/styles.css`):

   - Reset de estilos
   - Fonte padrão
   - Background gradiente

2. **Por Componente**:
   - Estilos isolados e encapsulados
   - Design responsivo com media queries
   - Breakpoints: 768px (tablet) e 480px (mobile)

### Paleta de Cores

```css
/* Primária */
--primary: #3498db;
--primary-dark: #2980b9;

/* Secundária */
--secondary: #95a5a6;
--secondary-dark: #7f8c8d;

/* Feedback */
--error: #e74c3c;
--success: #16a085;

/* Neutros */
--text-primary: #2c3e50;
--text-secondary: #7f8c8d;
--background: #f8f9fa;
```

## Fluxo de Dados

### Busca de CEP

```
Usuário digita CEP
    ↓
Validação no formulário
    ↓
Evento de submit
    ↓
CepSearchComponent.searchCep()
    ↓
ViaCepService.getAddressByCep()
    ↓
HttpClient → API ViaCEP
    ↓
Response (Observable)
    ↓
Exibe resultado ou erro
```

### Navegação para Detalhes

```
Usuário clica "Ver Detalhes"
    ↓
CepSearchComponent.viewDetails()
    ↓
Router.navigate(['/cep', cleanCep])
    ↓
CepDetailsComponent carrega
    ↓
ngOnInit() → ActivatedRoute.params
    ↓
loadAddressDetails()
    ↓
ViaCepService.getAddressByCep()
    ↓
Exibe detalhes completos
```

## Dependências Principais

```json
{
  "@angular/common": "HttpClientModule, CommonModule",
  "@angular/forms": "ReactiveFormsModule, FormsModule",
  "@angular/router": "RouterModule",
  "rxjs": "Observable, throwError, catchError, map"
}
```

## Testes

### ViaCepService Tests

**Arquivo**: `src/app/services/via-cep.service.spec.ts`

**Cenários testados:**

- ✅ Serviço é criado corretamente
- ✅ Busca CEP válido retorna dados
- ✅ CEP inválido retorna erro
- ✅ Formatação de CEP funciona corretamente

### Como executar testes

```bash
# Todos os testes
npm test

# Testes com cobertura
npm run test -- --code-coverage

# Modo watch
npm test -- --watch
```

## Melhorias Futuras

### Funcionalidades

- [ ] Histórico de buscas (localStorage)
- [ ] Busca reversa (por endereço)
- [ ] Integração com mapa
- [ ] Compartilhamento de endereço
- [ ] Copiar campos individuais
- [ ] Favoritos

### Técnicas

- [ ] Lazy Loading de módulos
- [ ] Service Worker (PWA)
- [ ] Cache de requisições
- [ ] Animações avançadas
- [ ] Internacionalização (i18n)
- [ ] Testes E2E com Cypress/Playwright

### Performance

- [ ] OnPush Change Detection
- [ ] Virtual Scrolling (se houver lista)
- [ ] Debounce na busca
- [ ] Otimização de bundle
- [ ] Server-Side Rendering (SSR)

## Boas Práticas Implementadas

✅ **Clean Code**

- Nomes descritivos
- Funções pequenas e focadas
- Comentários em JSDoc
- Código autoexplicativo

✅ **SOLID**

- Single Responsibility Principle
- Dependency Injection
- Interface Segregation

✅ **DRY (Don't Repeat Yourself)**

- Código reutilizável
- Serviço centralizado
- Estilos compartilhados

✅ **Segurança**

- Validação de entrada
- Tratamento de erros
- Sanitização de dados

✅ **Performance**

- Lazy evaluation
- Unsubscribe automático (async pipe)
- Change detection otimizada

✅ **Acessibilidade**

- Labels em formulários
- Feedback visual
- Navegação por teclado

## Contato e Suporte

Para dúvidas ou sugestões sobre a implementação técnica, sinta-se à vontade para abrir uma issue no repositório.

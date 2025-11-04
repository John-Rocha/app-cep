# App de Busca de Endereços pelo CEP

Este é um aplicativo Angular que permite aos usuários buscar endereços completos a partir de um CEP (Código de Endereçamento Postal) utilizando a API ViaCEP.

## 🚀 Funcionalidades

- ✅ Busca de endereço por CEP
- ✅ Validação automática do formato do CEP
- ✅ Formatação automática do CEP enquanto digita
- ✅ Exibição completa dos dados do endereço
- ✅ Página de detalhes com todos os dados retornados pela API
- ✅ Tratamento de erros (CEP inválido, não encontrado, erro de rede)
- ✅ Design responsivo para mobile e desktop
- ✅ Navegação entre páginas com roteamento
- ✅ Interface moderna e intuitiva

## 🛠️ Tecnologias Utilizadas

- **Angular 15** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **HttpClient** - Requisições HTTP
- **Reactive Forms** - Formulários reativos
- **Angular Router** - Navegação entre páginas
- **API ViaCEP** - Consulta de CEPs brasileiros

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- Angular CLI (opcional, mas recomendado)

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd app-cep
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm start
```

4. Acesse a aplicação em: `http://localhost:4200`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── cep-search/           # Componente de busca de CEP
│   │   │   ├── cep-search.component.ts
│   │   │   ├── cep-search.component.html
│   │   │   └── cep-search.component.css
│   │   └── cep-details/          # Componente de detalhes do CEP
│   │       ├── cep-details.component.ts
│   │       ├── cep-details.component.html
│   │       └── cep-details.component.css
│   ├── models/
│   │   └── address.model.ts      # Interface do modelo de endereço
│   ├── services/
│   │   ├── via-cep.service.ts    # Serviço de integração com API
│   │   └── via-cep.service.spec.ts
│   ├── app-routing.module.ts     # Configuração de rotas
│   ├── app.module.ts             # Módulo principal
│   └── app.component.*           # Componente raiz
├── assets/                        # Arquivos estáticos
└── styles.css                     # Estilos globais
```

## 🔌 API Utilizada

A aplicação utiliza a [API ViaCEP](https://viacep.com.br/), que é gratuita e não requer autenticação.

**Endpoint:** `https://viacep.com.br/ws/{cep}/json/`

### Dados Retornados

- CEP
- Logradouro
- Complemento
- Bairro
- Localidade (Cidade)
- UF (Estado)
- Código IBGE
- GIA
- DDD
- SIAFI

## 🛣️ Rotas da Aplicação

- `/` - Página principal com formulário de busca
- `/cep/:cep` - Página de detalhes do endereço consultado

## ⚙️ Funcionalidades Técnicas

### Serviço ViaCEP (`via-cep.service.ts`)

- Validação de formato do CEP
- Limpeza automática de caracteres não numéricos
- Tratamento de erros HTTP
- Formatação de CEP para exibição

### Componente de Busca (`cep-search.component`)

- Formulário reativo com validação
- Formatação automática do input
- Loading state durante a busca
- Exibição de resultados ou erros

### Componente de Detalhes (`cep-details.component`)

- Carregamento dinâmico baseado no parâmetro da rota
- Exibição detalhada de todos os campos
- Opção de copiar endereço completo
- Navegação de volta para busca

## 🎨 Design

O aplicativo possui um design moderno e responsivo com:

- Gradiente de fundo atraente
- Cards com sombras e efeitos hover
- Ícones ilustrativos
- Feedback visual para ações do usuário
- Layout adaptativo para diferentes tamanhos de tela

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos de build serão gerados no diretório `dist/`.

## 📝 Boas Práticas Implementadas

- ✅ Código limpo e bem documentado
- ✅ Separação de responsabilidades (services, components, models)
- ✅ Tipagem forte com TypeScript
- ✅ Tratamento adequado de erros
- ✅ Programação reativa com RxJS
- ✅ Componentização reutilizável
- ✅ Responsividade mobile-first
- ✅ Validação de formulários
- ✅ Loading states e feedback ao usuário

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando Angular

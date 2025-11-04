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
- ✅ **Sistema de temas (Light, Dark e System)**
- ✅ **Persistência de preferências do usuário**
- ✅ **Detecção automática de tema do sistema**

## 🎨 Temas

A aplicação oferece três opções de tema visual:

- **☀️ Light Mode** - Tema claro ideal para ambientes bem iluminados
- **🌙 Dark Mode** - Tema escuro perfeito para uso noturno e economia de bateria
- **� System** - Segue automaticamente a preferência do sistema operacional

### Recursos dos Temas:

- Alternância instantânea entre temas
- Salvamento automático da preferência
- Cores otimizadas para acessibilidade (WCAG AA)
- Transições suaves entre mudanças
- Detecção em tempo real de mudanças no sistema

## �🛠️ Tecnologias Utilizadas

- **Angular 15** - Framework principal
- **TypeScript** - Linguagem de programação
- **RxJS** - Programação reativa
- **HttpClient** - Requisições HTTP
- **Reactive Forms** - Formulários reativos
- **Angular Router** - Navegação entre páginas
- **API ViaCEP** - Consulta de CEPs brasileiros
- **CSS Variables** - Sistema de temas dinâmico
- **localStorage** - Persistência de preferências

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
│   │   ├── cep-details/          # Componente de detalhes do CEP
│   │   │   ├── cep-details.component.ts
│   │   │   ├── cep-details.component.html
│   │   │   └── cep-details.component.css
│   │   └── theme-toggle/         # Componente de alternância de tema
│   │       ├── theme-toggle.component.ts
│   │       ├── theme-toggle.component.html
│   │       └── theme-toggle.component.css
│   ├── models/
│   │   └── address.model.ts      # Interface do modelo de endereço
│   ├── services/
│   │   ├── via-cep.service.ts    # Serviço de integração com API
│   │   ├── via-cep.service.spec.ts
│   │   └── theme.service.ts      # Serviço de gerenciamento de temas
│   ├── app-routing.module.ts     # Configuração de rotas
│   ├── app.module.ts             # Módulo principal
│   └── app.component.*           # Componente raiz
├── assets/                        # Arquivos estáticos
└── styles.css                     # Estilos globais com variáveis de tema
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

### Serviço de Temas (`theme.service.ts`)

- Gerenciamento de três temas (Light, Dark, System)
- Persistência no localStorage
- Observable reativo para mudanças de tema
- Detecção automática de preferências do sistema operacional
- Escuta mudanças em tempo real do tema do SO

### Componente de Busca (`cep-search.component`)

- Formulário reativo com validação
- Formatação automática do input
- Loading state durante a busca
- Exibição de resultados ou erros
- Seletor de tema integrado

### Componente de Detalhes (`cep-details.component`)

- Carregamento dinâmico baseado no parâmetro da rota
- Exibição detalhada de todos os campos
- Opção de copiar endereço completo
- Navegação de volta para busca
- Seletor de tema integrado

### Componente de Alternância de Tema (`theme-toggle.component`)

- Botões visuais para seleção de tema
- Indicador visual do tema ativo
- Responsivo com hide de labels em mobile
- Acessibilidade completa (ARIA labels)

## 🎨 Design

O aplicativo possui um design moderno e responsivo com:

- Sistema de temas adaptável (Light/Dark/System)
- CSS Variables para customização fácil
- Cores otimizadas para acessibilidade (WCAG AA)
- Transições suaves entre mudanças de tema
- Cards com sombras e efeitos hover
- Ícones ilustrativos (SVG)
- Feedback visual para ações do usuário
- Layout adaptativo para diferentes tamanhos de tela
- Gradiente de fundo responsivo ao tema

### Paleta de Cores

**Tema Light:**

- Background: Tons de branco (#ffffff)
- Texto: Tons de preto (#212529)
- Accent: Azul (#3498db)

**Tema Dark:**

- Background: Tons de preto (#1a1a1a)
- Texto: Tons de branco (#f8f9fa)
- Accent: Azul claro (#4da6ff)

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
- ✅ Sistema de temas com CSS Variables
- ✅ Persistência de preferências do usuário
- ✅ Acessibilidade (WCAG AA)
- ✅ Performance otimizada

## 📚 Documentação Adicional

- **[SISTEMA-DE-TEMAS.md](./SISTEMA-DE-TEMAS.md)** - Documentação completa do sistema de temas
- **[DOCUMENTACAO-TECNICA.md](./DOCUMENTACAO-TECNICA.md)** - Arquitetura e detalhes técnicos
- **[CEPS-TESTE.md](./CEPS-TESTE.md)** - Lista de CEPs para teste

## 💡 Como Usar

### Buscando um CEP

1. Na página inicial, digite um CEP válido (8 dígitos)
2. O CEP será formatado automaticamente (XXXXX-XXX)
3. Clique em "Buscar" ou pressione Enter
4. O endereço será exibido imediatamente
5. Clique em "Ver Detalhes Completos" para informações adicionais

### Alternando Temas

1. Localize os botões de tema no topo da página
2. Clique em **Light** (☀️) para tema claro
3. Clique em **Dark** (🌙) para tema escuro
4. Clique em **System** (💻) para seguir o tema do sistema operacional
5. Sua preferência será salva automaticamente

### Navegação

- Use o botão "Voltar" para retornar à busca
- Use "Buscar Outro CEP" para nova consulta
- O histórico do navegador funciona normalmente

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ usando Angular

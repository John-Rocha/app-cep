# Sistema de Temas - App CEP

## Visão Geral

O App CEP agora conta com um sistema completo de temas que permite ao usuário escolher entre:

- 🌞 **Light Mode** - Tema claro com fundo branco
- 🌙 **Dark Mode** - Tema escuro com fundo preto
- 💻 **System** - Segue a preferência do sistema operacional

## Funcionalidades

### 1. Alternância de Temas

O usuário pode alternar entre os três temas através dos botões localizados no topo das páginas:

- Cada tema tem seu próprio ícone visual
- O botão ativo fica destacado em azul
- A mudança de tema é instantânea e suave

### 2. Persistência

- O tema escolhido é salvo no `localStorage`
- Ao retornar à aplicação, o último tema usado é automaticamente aplicado
- Funciona mesmo após fechar o navegador

### 3. Modo System

- Detecta automaticamente a preferência do sistema operacional
- Responde dinamicamente a mudanças na configuração do sistema
- Ideal para quem usa modo escuro noturno automático

## Arquitetura Técnica

### ThemeService

**Localização**: `src/app/services/theme.service.ts`

Serviço central que gerencia todos os aspectos dos temas:

```typescript
export class ThemeService {
  setTheme(theme: Theme): void          // Define um novo tema
  get currentTheme: Theme               // Retorna o tema atual
  get isDarkMode: boolean               // Verifica se está em modo escuro
  theme$: Observable<Theme>             // Observable do tema atual
}
```

**Recursos:**

- Observable reativo para atualizações de tema
- Escuta mudanças na preferência do sistema (`prefers-color-scheme`)
- Gerenciamento de localStorage
- Aplicação de classes CSS no `document.documentElement`

### ThemeToggleComponent

**Localização**: `src/app/components/theme-toggle/`

Componente visual para seleção de tema:

**Características:**

- Três botões com ícones SVG (sol, lua, monitor)
- Indicador visual do tema ativo
- Responsivo para dispositivos móveis (esconde labels em telas pequenas)
- Acessibilidade completa com `aria-label` e `title`

## Variáveis CSS

### Estrutura

Todas as cores e estilos são definidos através de CSS Variables em `src/styles.css`:

```css
:root,
.light-theme {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --accent-primary: #3498db;
  /* ... mais variáveis */
}

.dark-theme {
  --bg-primary: #1a1a1a;
  --text-primary: #f8f9fa;
  --accent-primary: #4da6ff;
  /* ... mais variáveis */
}
```

### Categorias de Variáveis

#### Backgrounds

- `--bg-primary` - Fundo principal dos cards
- `--bg-secondary` - Fundo secundário (inputs, etc)
- `--bg-tertiary` - Fundo terciário (hover states)
- `--bg-gradient-start/end` - Gradiente do body

#### Textos

- `--text-primary` - Texto principal
- `--text-secondary` - Texto secundário (subtítulos)
- `--text-tertiary` - Texto terciário (desabilitado)

#### Bordas

- `--border-color` - Cor padrão das bordas
- `--border-color-hover` - Cor das bordas no hover

#### Accent Colors

- `--accent-primary` - Cor primária (azul)
- `--accent-primary-hover` - Hover da cor primária
- `--accent-secondary` - Cor secundária (cinza)
- `--accent-secondary-hover` - Hover da cor secundária

#### Status Colors

- `--color-success` - Cor de sucesso (verde)
- `--color-error` - Cor de erro (vermelho)
- `--color-error-bg` - Fundo de mensagens de erro
- `--color-warning` - Cor de aviso (laranja)

#### Sombras

- `--shadow-sm` - Sombra pequena
- `--shadow-md` - Sombra média
- `--shadow-lg` - Sombra grande
- `--shadow-hover` - Sombra em hover

## Paleta de Cores

### Tema Light (Claro)

```
Background:  #ffffff (branco)
Text:        #212529 (quase preto)
Primary:     #3498db (azul médio)
Secondary:   #95a5a6 (cinza)
Success:     #16a085 (verde turquesa)
Error:       #e74c3c (vermelho)
```

### Tema Dark (Escuro)

```
Background:  #1a1a1a (preto suave)
Text:        #f8f9fa (quase branco)
Primary:     #4da6ff (azul claro)
Secondary:   #6c757d (cinza escuro)
Success:     #1abc9c (verde claro)
Error:       #e74c3c (vermelho)
```

## Transições

Todas as mudanças de cor incluem transições suaves de 0.3s:

```css
body {
  transition: background 0.3s ease, color 0.3s ease;
}
```

Isso garante uma experiência visual agradável ao alternar temas.

## Como Usar nos Componentes

### 1. No CSS

Sempre use variáveis CSS em vez de cores hardcoded:

```css
/* ❌ Evite */
background: #ffffff;
color: #333;

/* ✅ Prefira */
background: var(--bg-primary);
color: var(--text-primary);
```

### 2. No TypeScript

Inject o ThemeService quando precisar:

```typescript
constructor(private themeService: ThemeService) {}

ngOnInit() {
  // Escutar mudanças de tema
  this.themeService.theme$.subscribe(theme => {
    console.log('Tema mudou para:', theme);
  });

  // Verificar se está em dark mode
  if (this.themeService.isDarkMode) {
    // Lógica específica para dark mode
  }
}
```

### 3. No Template

Adicione o componente de toggle:

```html
<app-theme-toggle></app-theme-toggle>
```

## Detecção de Preferência do Sistema

O serviço usa a Media Query `prefers-color-scheme`:

```typescript
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// Escuta mudanças
mediaQuery.addEventListener("change", (e) => {
  if (theme === "system") {
    applySystemTheme();
  }
});
```

## Responsividade

Em dispositivos móveis (< 480px):

- Labels dos botões são ocultados
- Apenas ícones são exibidos
- Botões ficam mais compactos

## Acessibilidade

### ARIA Labels

Todos os botões incluem:

- `aria-label` - Descrição para leitores de tela
- `title` - Tooltip ao passar o mouse
- Classes `.active` - Indicador visual claro

### Contraste

Todas as combinações de cores atendem aos padrões WCAG AA:

- Contraste mínimo de 4.5:1 para texto normal
- Contraste mínimo de 3:1 para texto grande

## localStorage

### Chave Usada

```
'app-cep-theme'
```

### Valores Salvos

- `'light'` - Tema claro
- `'dark'` - Tema escuro
- `'system'` - Preferência do sistema

### Limpeza

Para resetar o tema:

```javascript
localStorage.removeItem("app-cep-theme");
```

## Testes

### Testar Dark Mode

1. Abra a aplicação
2. Clique no botão "Dark"
3. Observe as cores mudarem
4. Recarregue a página - deve manter dark mode

### Testar System Mode

1. Clique no botão "System"
2. Mude a preferência do SO:
   - **Windows**: Configurações → Personalização → Cores
   - **macOS**: Preferências → Geral → Aparência
   - **Linux**: Configurações do tema do sistema
3. Observe a aplicação responder automaticamente

### Testar Persistência

1. Escolha um tema
2. Feche o navegador completamente
3. Abra novamente
4. O tema deve estar preservado

## Boas Práticas Implementadas

✅ **Separação de Responsabilidades**

- Serviço dedicado para lógica de temas
- Componente dedicado para UI
- CSS centralizado com variáveis

✅ **Performance**

- Uso de CSS Variables (nativo do navegador)
- Transições CSS em vez de JavaScript
- localStorage para cache

✅ **Manutenibilidade**

- Uma única fonte de verdade para cores
- Fácil adicionar novos temas
- Código bem documentado

✅ **UX/UI**

- Mudanças suaves e não abruptas
- Feedback visual imediato
- Respeita preferências do usuário

## Possíveis Melhorias Futuras

- [ ] Mais temas (alto contraste, daltonismo, etc)
- [ ] Customização de cores pelo usuário
- [ ] Modo de leitura (sepia)
- [ ] Tema automático por hora do dia
- [ ] Animações de transição mais elaboradas
- [ ] Preview dos temas antes de aplicar

## Suporte a Navegadores

| Navegador | Versão Mínima | Suporte  |
| --------- | ------------- | -------- |
| Chrome    | 49+           | ✅ Total |
| Firefox   | 31+           | ✅ Total |
| Safari    | 9.1+          | ✅ Total |
| Edge      | 15+           | ✅ Total |
| Opera     | 36+           | ✅ Total |

**Nota**: CSS Variables são suportadas em todos os navegadores modernos desde 2016.

---

Desenvolvido com ❤️ e atenção aos detalhes

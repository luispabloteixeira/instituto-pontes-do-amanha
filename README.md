# Instituto Pontes do Amanhã

Projeto acadêmico front-end voltado a uma interface institucional para o terceiro setor. A aplicação foi organizada segundo o princípio de **separation of concerns** e implementada como **Single Page Application (SPA)** em Vanilla JavaScript, com foco em semântica, acessibilidade, responsividade, modularização e experiência do utilizador.

## Tecnologias utilizadas

- **HTML5**: estrutura semântica e acessível.
- **CSS3**: design system, CSS Grid de 12 colunas, Flexbox, cinco breakpoints, estados interativos e componentes responsivos.
- **Vanilla JavaScript (ES6+)**: manipulação do DOM, eventos, SPA, templates dinâmicos, validação e armazenamento local.
- **ES6 Modules**: separação de responsabilidades com `import` e `export`.
- **Web Storage API**: persistência de interesses com `localStorage`, `JSON.stringify()` e `JSON.parse()`.
- **Vite 8**: servidor de desenvolvimento e build otimizada de produção.
- **Git e GitHub**: versionamento, GitFlow, issues, pull requests e documentação das entregas.

A aplicação não utiliza framework JavaScript. O Vite é empregado exclusivamente como ferramenta de desenvolvimento e empacotamento de produção.

## Estrutura do projeto

```text
instituto-pontes-do-amanha/
├── html/       # documento mestre da SPA
├── css/        # design system, responsividade, modo escuro e contraste
├── imagens/    # recursos visuais
├── js/         # ponto de entrada, módulos, dados e views
│   ├── data/
│   ├── modules/
│   └── views/
├── scripts/    # smoke test e métricas da build
├── entregas/   # evidências e documentação técnica
├── vite.config.mjs
├── package.json
├── CHANGELOG.md
└── README.md
```

## Pré-requisitos

Para o fluxo com Vite são necessários:

- Git;
- Node.js 20.19+ ou 22.12+;
- npm;
- navegador moderno.

## Instalação e execução local

1. Clone o repositório:

```bash
git clone https://github.com/luispabloteixeira/instituto-pontes-do-amanha.git
```

2. Entre na pasta:

```bash
cd instituto-pontes-do-amanha
```

3. Instale a dependência de desenvolvimento:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse `/html/` no endereço apresentado pelo Vite.

## Build de produção

A build é gerada com Vite:

```bash
npm run build
```

A configuração está em `vite.config.mjs`. A entrada é `html/index.html`, a saída é gravada em `dist/`, o JavaScript é minificado com **Oxc** e o CSS com **Lightning CSS**. O Vite também processa o HTML, consolida os módulos ES6 e reescreve as referências dos assets para a versão otimizada.

Para testar a build localmente:

```bash
npm run preview
```

## Testes e validação

O comando abaixo gera uma build limpa e executa o smoke test:

```bash
npm test
```

O teste confirma a existência de `dist/html/index.html`, preservação do contêiner principal da SPA e geração de bundles JavaScript sintaticamente válidos. O workflow do GitHub Actions também inicia o `vite preview` e valida a resposta HTTP da versão construída.

As métricas de tamanho podem ser geradas após a build com:

```bash
npm run metrics
```

Esse comando compara HTML, CSS e JavaScript de origem com os ficheiros gerados em `dist/` e calcula a redução percentual.

## Recursos implementados

- SPA por hash (`#/inicio`, `#/projetos`, `#/cadastro`, `#/componentes`);
- interceptação de navegação com `preventDefault()`;
- injeção de views via DOM;
- templates de cards com Template Literals, `map()` e `join()`;
- delegação de eventos nos cards dinâmicos;
- persistência de interesses com `localStorage`, `JSON.stringify()` e `JSON.parse()`;
- validação nativa combinada com JavaScript em tempo real;
- menu dropdown e hambúrguer acessíveis;
- toast, alertas, badges e modal;
- ES6 Modules com `import` e `export`;
- CSS Grid de 12 colunas, Flexbox e cinco breakpoints;
- modo escuro e alto contraste adaptados às preferências do sistema.

Nenhum dado pessoal do formulário é persistido no navegador.

## Versionamento e fluxo Git

O projeto adota **Versionamento Semântico (SemVer)** no formato `MAJOR.MINOR.PATCH`:

- **MAJOR**: mudanças incompatíveis ou reestruturações que quebram compatibilidade;
- **MINOR**: novas funcionalidades compatíveis;
- **PATCH**: correções pontuais e ajustes sem quebra de compatibilidade.

A versão `v1.0.0` representa a primeira entrega funcional estável da aplicação.

O fluxo de branches segue uma adaptação do **GitFlow**:

- `main`: versão estável e pronta para entrega;
- `develop`: integração do desenvolvimento contínuo;
- `feature/*`: novas funcionalidades isoladas;
- `release/*`: preparação de versões;
- `hotfix/*`: correções urgentes.

As mensagens recentes seguem **Conventional Commits**, utilizando prefixos como `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `build:` e `chore:`.

## Gestão e rastreabilidade

O repositório utiliza issues para registrar tarefas técnicas e pull requests para documentar a integração entre branches. O GitHub Actions valida automaticamente a build de produção, o smoke test, as métricas de minificação e o preview HTTP.

Documentações complementares encontram-se na pasta `entregas/`.

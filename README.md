# Instituto Pontes do Amanhã

Projeto acadêmico front-end voltado a uma interface institucional para o terceiro setor. A aplicação foi organizada segundo o princípio de **separation of concerns** e implementada como **Single Page Application (SPA)** em Vanilla JavaScript, com foco em semântica, acessibilidade, responsividade, modularização e experiência do utilizador.

## Tecnologias utilizadas

- **HTML5**: estrutura semântica e acessível.
- **CSS3**: design system, CSS Grid de 12 colunas, Flexbox, cinco breakpoints, estados interativos e componentes responsivos.
- **Vanilla JavaScript (ES6+)**: manipulação do DOM, eventos, SPA, templates dinâmicos, validação e armazenamento local.
- **ES6 Modules**: separação de responsabilidades com `import` e `export`.
- **Web Storage API**: persistência de interesses com `localStorage`, `JSON.stringify()` e `JSON.parse()`.
- **Git e GitHub**: versionamento, GitFlow, issues, pull requests e documentação das entregas.

Não foram utilizadas bibliotecas ou frameworks externos, pois os requisitos funcionais desta etapa foram atendidos com recursos nativos da plataforma Web.

## Estrutura do projeto

```text
instituto-pontes-do-amanha/
├── html/       # documento mestre da SPA
├── css/        # design system, Grid, Flexbox, responsividade e estados
├── imagens/    # recursos visuais
├── js/         # ponto de entrada, módulos, dados e views
│   ├── data/   # dados utilizados pelos templates
│   ├── modules/# navegação, roteamento, storage, validação e feedback
│   └── views/  # fragmentos renderizados pela SPA
├── entregas/   # evidências e documentação técnica
├── CHANGELOG.md
└── README.md
```

## Pré-requisitos

Para executar o projeto localmente são necessários:

- Git para clonar o repositório;
- navegador moderno com suporte a ES6 Modules e Web Storage;
- Python 3 ou outro servidor HTTP local simples.

O projeto não possui dependências NPM, portanto não é necessário executar `npm install`.

## Instalação e execução local

1. Clone o repositório:

```bash
git clone https://github.com/luispabloteixeira/instituto-pontes-do-amanha.git
```

2. Entre na pasta do projeto:

```bash
cd instituto-pontes-do-amanha
```

3. Inicie um servidor HTTP local:

```bash
python -m http.server 8000
```

4. Acesse no navegador:

```text
http://localhost:8000/html/
```

O uso de servidor HTTP é recomendado porque a aplicação utiliza ES6 Modules, cujo carregamento pode ser limitado quando os arquivos são abertos diretamente pelo protocolo `file://`.

## Build e dependências

A aplicação é composta por HTML, CSS e JavaScript nativos e não utiliza bundler, transpilador ou processo de compilação. Por esse motivo, **não existe etapa de build obrigatória**: os arquivos versionados já constituem a aplicação executável.

Também não há dependências externas a instalar. Caso o projeto evolua para utilizar NPM, esta seção deverá ser atualizada com os comandos correspondentes.

## Testes e validação

Os testes são realizados executando a aplicação por servidor HTTP e verificando os fluxos principais no navegador e no DevTools.

Principais cenários validados:

- navegação SPA e tratamento de rotas;
- menus dropdown e hambúrguer;
- geração dinâmica de cards;
- eventos `click`, `input` e `submit`;
- validação de formulários e mensagens de erro/sucesso;
- abertura e fechamento de modal e toast;
- persistência e restauração de interesses pelo `localStorage`;
- comportamento responsivo nos breakpoints definidos;
- inspeção de Console e Network para identificar erros de carregamento ou execução.

A documentação dos testes e das correções está disponível em `entregas/testes-spa.md` e nos demais registros da pasta `entregas/`.

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
- CSS Grid de 12 colunas, Flexbox e cinco breakpoints.

Nenhum dado pessoal do formulário é persistido no navegador.

## Versionamento e fluxo Git

O projeto adota **Versionamento Semântico (SemVer)** no formato `MAJOR.MINOR.PATCH`:

- **MAJOR**: mudanças incompatíveis ou reestruturações que quebram compatibilidade;
- **MINOR**: novas funcionalidades compatíveis;
- **PATCH**: correções pontuais e ajustes sem quebra de compatibilidade.

A versão `v1.0.0` representa a primeira entrega funcional estável da aplicação, reunindo SPA, templates dinâmicos, armazenamento local, validação, acessibilidade e modularização ES6.

O fluxo de branches segue uma adaptação do **GitFlow**:

- `main`: versão estável e pronta para entrega;
- `develop`: integração do desenvolvimento contínuo;
- `feature/*`: novas funcionalidades isoladas;
- `release/*`: preparação de versões;
- `hotfix/*`: correções urgentes sobre a versão estável.

As mensagens recentes seguem **Conventional Commits**, utilizando prefixos como `feat:`, `fix:`, `refactor:`, `docs:` e `chore:` para indicar a natureza da alteração.

## Gestão e rastreabilidade

O repositório utiliza issues para registrar tarefas técnicas e pull requests para documentar a integração entre branches. Os registros permitem relacionar requisitos, implementação, revisão e conclusão das alterações antes da incorporação à `main`.

Documentações complementares podem ser consultadas na pasta `entregas/`, incluindo GitFlow, versionamento, arquitetura, testes e checklist técnico.

# Instituto Pontes do Amanhã

Projeto acadêmico front-end organizado segundo **separation of concerns** e implementado como **Single Page Application (SPA)** em Vanilla JavaScript.

## Estrutura

```text
instituto-pontes-do-amanha/
├── html/       # documento mestre da SPA
├── css/        # design system, Grid, Flexbox, responsividade e estados
├── imagens/    # recursos visuais
├── js/         # ponto de entrada, módulos, dados e views
│   ├── data/
│   ├── modules/
│   └── views/
└── entregas/   # evidências e documentação técnica
```

## Como executar

Por usar ES6 Modules, execute o projeto em um servidor HTTP local. Na raiz do projeto:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000/html/`.

## Recursos implementados

- SPA por hash (`#/inicio`, `#/projetos`, `#/cadastro`, `#/componentes`)
- interceptação de navegação com `preventDefault()`
- injeção de views via DOM
- templates de cards com Template Literals + `map()` + `join()`
- delegação de eventos nos cards dinâmicos
- persistência de interesses com `localStorage`, `JSON.stringify()` e `JSON.parse()`
- validação nativa + JavaScript em tempo real
- menu dropdown e hambúrguer acessíveis
- toast, alertas, badges e modal
- ES6 Modules com `import`/`export`
- CSS Grid de 12 colunas, Flexbox e cinco breakpoints

Nenhum dado pessoal do formulário é persistido.

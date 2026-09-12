# Arquitetura final da experiência prática

## Pastas obrigatórias
- `/html`: contém o documento mestre `index.html` da SPA.
- `/css`: contém `style.css`, com design system, Grid, Flexbox, breakpoints e estados.
- `/imagens`: contém os recursos gráficos usados nas views.
- `/js`: contém o ponto de entrada e módulos ES6 independentes.

## SPA
`router.js` intercepta links com `data-route`, executa `preventDefault()`, altera o hash e renderiza a view correspondente no `#app`. A função `renderRoute()` limpa o contêiner com `innerHTML = ''` e injeta o novo fragmento.

## Templates dinâmicos
`project-templates.js` recebe o array de `data/projects.js` e gera os cards com Template Literals, `map()` e `join('')`.

## Persistência
`storage.js` salva apenas IDs de projetos de interesse em `localStorage`, usando `JSON.stringify()` para gravação e `JSON.parse()` para recuperação. Dados pessoais não são armazenados.

## Modularização
- `navigation.js`: menu, dropdown e hambúrguer.
- `router.js`: rotas da SPA.
- `project-templates.js`: renderização e eventos dos cards.
- `storage.js`: Web Storage.
- `form-validation.js`: consistência de formulário.
- `masks.js`: máscaras de CPF, telefone e CEP.
- `feedback.js`: toast e modal.

# Versionamento e Conventional Commits

O projeto adota versionamento semântico no formato MAJOR.MINOR.PATCH.

- MAJOR: alterações incompatíveis ou reestruturações que quebram compatibilidade.
- MINOR: novas funcionalidades compatíveis, como SPA, templates dinâmicos, localStorage e modularização.
- PATCH: correções pontuais, ajustes de navegação, validação e documentação.

## Blocos fundamentais do histórico

- Atualização estrutural da aplicação para uma SPA modular completa.
- Ajuste de acesso pelo GitHub Pages por redirecionamento.
- Correções de agrupamento semântico e validação do formulário.
- Documentação do GitFlow e da estratégia de branches.

## Padrão de commits

A partir desta etapa, as mensagens seguem o padrão Conventional Commits, por exemplo:

- feat: adiciona navegação SPA e templates dinâmicos
- feat: persiste interesses com localStorage
- refactor: separa JavaScript em módulos ES6
- fix: sincroniza estado do menu e aria-expanded
- docs: documenta GitFlow e versionamento semântico

## Versões

A branch `release/v1.0.0` representa a consolidação da primeira versão funcional completa do projeto. A versão `v1.0.0` é a referência semântica planejada para a entrega estável, reunindo SPA, templates, validação, localStorage, acessibilidade, feedbacks e modularização.

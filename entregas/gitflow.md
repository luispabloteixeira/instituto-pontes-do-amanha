# Estratégia de ramificação — GitFlow

O repositório adota uma estrutura inspirada no GitFlow para separar desenvolvimento contínuo, novas funcionalidades, correções e versões estáveis.

- `main`: versão estável e pronta para entrega/publicação.
- `develop`: integração contínua das funcionalidades antes de uma nova versão.
- `feature/spa`: desenvolvimento isolado da navegação em Single Page Application.
- `feature/localstorage`: implementação da persistência local com `localStorage`, `JSON.stringify()` e `JSON.parse()`.
- `feature/modularizacao-js`: organização do JavaScript em ES6 Modules com `import` e `export`.
- `release/v1.0.0`: preparação da versão de entrega a partir do conteúdo consolidado em `develop`.
- `hotfix/menu-state`: branch destinada à correção pontual de estado de navegação/menu sem interromper o fluxo normal de desenvolvimento.

O fluxo adotado considera que novas funcionalidades são desenvolvidas em branches `feature/*`, integradas em `develop` após validação e, quando o conjunto está estável, preparado em `release/*` e incorporado à `main`. Correções urgentes partem de `main` através de `hotfix/*` e, após corrigidas, devem ser refletidas também em `develop`.

Essa organização reduz alterações diretas na versão estável e demonstra uma separação clara entre desenvolvimento, integração, correções e publicação.
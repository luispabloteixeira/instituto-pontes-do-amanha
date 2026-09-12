# Deploy no GitHub Pages

## Plataforma escolhida

A plataforma definida para produção é o **GitHub Pages**. A escolha mantém código, controlo de versão, revisão e publicação dentro do mesmo ecossistema do GitHub, sem necessidade de servidor próprio. Como a aplicação é uma SPA front-end estática, sem backend, o Pages atende ao requisito de hospedagem com HTTPS e URL pública.

## Build de produção

A aplicação utiliza Vite para gerar a pasta `dist/`. O ficheiro `vite.config.mjs` possui duas entradas HTML:

- `index.html`, responsável pela entrada na raiz e redirecionamento para a SPA;
- `html/index.html`, documento principal da aplicação.

A opção `base: './'` mantém caminhos relativos compatíveis com a publicação em subdiretório do GitHub Pages.

## CI/CD

O workflow `.github/workflows/build.yml` executa em pull requests e pushes na `main`. Ele instala as dependências, gera a build, executa smoke tests, mede os tamanhos dos bundles e valida a aplicação por HTTP usando `vite preview`.

O workflow `.github/workflows/deploy-pages.yml` executa em cada push na `main`. O processo:

1. faz checkout do repositório;
2. configura Node.js 22;
3. instala as dependências com `npm install`;
4. executa `npm test`, que gera e valida a build;
5. envia a pasta `dist/` como artefacto do GitHub Pages;
6. publica o artefacto com `actions/deploy-pages` no ambiente `github-pages`.

Assim, uma alteração só chega à versão publicada depois de ser versionada, integrada na `main` e passar pela geração/validação da build.

## Ativação no GitHub

Para o primeiro deploy, o repositório deve ter o Pages configurado em **Settings > Pages > Build and deployment > Source: GitHub Actions**. Essa seleção é uma configuração administrativa do repositório e não é feita pelos ficheiros do projeto.

Após essa ativação, os pushes seguintes na `main` utilizam automaticamente o workflow de deploy configurado no repositório.

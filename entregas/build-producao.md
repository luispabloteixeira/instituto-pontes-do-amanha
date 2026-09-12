# Build de produção com Vite

## Ferramenta

A build de produção utiliza **Vite 8.3.0**. O projeto mantém JavaScript Vanilla e módulos ES6; o Vite atua apenas como ferramenta de desenvolvimento, bundling e otimização.

A configuração encontra-se em `vite.config.mjs`:

- entrada: `html/index.html`;
- saída: `dist/`;
- `base: './'` para preservar referências relativas;
- minificação JavaScript: **Oxc**;
- minificação CSS: **Lightning CSS**;
- sourcemaps de produção desativados;
- relatório de tamanho comprimido ativado.

Comandos principais:

```bash
npm install
npm run build
npm run preview
npm test
npm run metrics
```

## Resultados medidos no GitHub Actions

A execução do workflow de build do PR #9 concluiu com sucesso.

| Grupo | Origem | Build | Redução |
| --- | ---: | ---: | ---: |
| HTML | 2.513 bytes | 2.502 bytes | 0,44% |
| CSS | 18.212 bytes | 15.749 bytes | 13,52% |
| JavaScript | 24.480 bytes | 19.719 bytes | 19,45% |
| Total | 45.205 bytes | 37.970 bytes | 16,00% |

A build gerou:

- `dist/html/index.html`: aproximadamente 2,50 kB (0,97 kB gzip);
- bundle CSS: aproximadamente 15,74 kB (3,93 kB gzip);
- bundle JavaScript: aproximadamente 19,71 kB (6,60 kB gzip).

## Desafios e validação

O principal cuidado foi preservar o comportamento da SPA ao consolidar os módulos ES6 e reescrever referências de assets. A aplicação usa navegação por hash e caminhos relativos, por isso a configuração utiliza `base: './'` e mantém `html/index.html` como entrada explícita.

Para reduzir o risco de a minificação alterar a lógica:

1. o Vite processa os módulos ES6 sem alterar as APIs públicas da aplicação;
2. o smoke test confirma que `dist/html/index.html` existe, mantém o contêiner `#app` e contém carregamento por módulo;
3. os bundles JavaScript gerados passam por `node --check`;
4. o GitHub Actions inicia `vite preview` e valida por HTTP o caminho `/html/`;
5. a build só é integrada à `main` após o workflow concluir com sucesso.

Esses testes validam estrutura, sintaxe e disponibilização HTTP da versão minificada. A minificação remove espaços, comentários e simplifica o código sem modificar intencionalmente o comportamento funcional da aplicação.

# Instituto Pontes do Amanhã

Projeto acadêmico fictício de uma plataforma web para uma ONG, organizado para as quatro experiências práticas de Desenvolvimento Front-End para Web.

## Relação com as unidades

- Experiência I: HTML5 semântico, `index.html`, `projetos.html`, `cadastro.html`, formulário, validações nativas e máscaras.
- Experiência II: design system, CSS3, estrutura responsiva, componentes visuais, menus, botões e estilização do formulário.
- Experiência III: fundamentos de JavaScript, organização inicial, controle de eventos, interatividade, modularização e refinamento.
- Experiência IV: controle de versões, documentação, acessibilidade, otimização e preparação para deploy em produção.

## Como executar

Abra `index.html` em um navegador. Não há dependências externas nem coleta real de dados.

Versão publicada: https://luispabloteixeira-hash.github.io/instituto-pontes-do-amanha/

## Validação sugerida

1. Validar os três arquivos HTML no W3C Markup Validation Service.
2. Testar navegação por teclado e visualização em celular.
3. Confirmar os padrões de CPF, telefone e CEP no formulário.
4. Registrar capturas das validações conforme os campos da plataforma acadêmica.

## Estado de preparação

O pacote contém a implementação técnica integrada que serve de base às quatro experiências. Os textos reflexivos, capturas, links de repositório e evidências de deploy devem ser preenchidos nos campos próprios de cada rascunho somente após a revisão do estudante.

## Estrutura

| Pasta | Arquivos |
| --- | --- |
| Raiz | index.html, projetos.html, cadastro.html, README.md |
| assets/ | oficina-comunitaria.png, oficina-comunitaria.jpg, oficina-comunitaria.webp |
| assets/css/ | style.css |
| assets/js/ | app.js |
| entregas/ | experiencia-I.md a experiencia-IV.md, revisao-pratica.md, validacao-w3c.json |

As páginas inicial e de projetos usam `picture` com WebP, JPEG e PNG de fallback. A página de projetos inclui uma ilustração com texto alternativo e legenda.

O cadastro agrupa dados pessoais, endereço e forma de participação em `fieldset` com `legend`. Cada controle possui `id`, `name` e `label` associado. Há campos para nascimento, logradouro, número, complemento e todas as 27 UFs. As restrições nativas ficam ativas, e JavaScript aplica máscaras e limita a data de nascimento ao dia atual. Os padrões verificam formato, sem comprovar existência de CPF, telefone ou CEP. Não há envio de dados ao servidor.

O resultado da validação dos três documentos HTML está em `entregas/validacao-w3c.json`, com hash SHA-256 de cada arquivo. A revisão dos sete itens está em `entregas/revisao-pratica.md`.

# Contraste, modo escuro e alto contraste

A aplicação mantém o modo claro como padrão e adapta automaticamente a paleta conforme as preferências do sistema operativo.

## Estratégia

- `@media (prefers-color-scheme: dark)`: ativa o modo escuro sem exigir JavaScript.
- `@media (prefers-contrast: more)`: reforça contraste, espessura de bordas e indicação de foco.
- `@media (prefers-color-scheme: dark) and (prefers-contrast: more)`: combina fundo preto, texto branco e cores de ação de alto contraste.
- As cores principais são controladas por CSS Custom Properties para evitar valores inconsistentes entre componentes.

## Combinações verificadas

### Modo claro
- Texto principal `#17324D` sobre `#FFFFFF`: **13.13:1**.
- Texto secundário `#546779` sobre `#FFFFFF`: **5.84:1**.
- Marca `#087F5B` sobre `#FFFFFF`: **5.00:1**.
- Texto branco `#FFFFFF` sobre botão `#087F5B`: **5.00:1**.
- Erro `#B42318` sobre `#FFFFFF`: **6.57:1**.
- Sucesso `#06734F` sobre `#FFFFFF`: **5.88:1**.

### Modo escuro
- Texto principal `#F8FAFC` sobre `#0B1220`: **17.89:1**.
- Texto secundário `#CBD5E1` sobre `#0B1220`: **12.61:1**.
- Texto do botão `#0B1220` sobre `#5EE0B8`: **11.44:1**.
- Marca `#86EFCF` sobre `#0B1220`: **13.61:1**.
- Erro `#FDA4AF` sobre `#0B1220`: **9.90:1**.
- Sucesso `#6EE7B7` sobre `#0B1220`: **12.28:1**.

### Alto contraste
- Preto `#000000` sobre branco `#FFFFFF`: **21.00:1**.
- Branco `#FFFFFF` sobre botão `#005A3C`: **8.31:1**.
- No perfil escuro de alto contraste, branco sobre preto: **21.00:1**.
- Texto preto `#000000` sobre botão `#63F5C8`: **15.43:1**.

## Ferramenta e critério de verificação

Os rácios foram calculados pela fórmula de luminância relativa utilizada pelas WCAG e conferidos segundo os critérios apresentados pelo **WebAIM Contrast Checker**. Para texto normal, o objetivo mínimo adotado foi **4.5:1** (WCAG AA). Também foram considerados estados de foco e componentes de interface, que requerem contraste visual suficiente para identificação.

A implementação encontra-se em `css/accessibility.css`, carregado após `css/style.css` para atuar como camada de adaptação sem alterar a estrutura principal da aplicação.

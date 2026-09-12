# Testes e correções

1. **ES6 Modules pelo protocolo `file://`**: navegadores podem bloquear importações locais. Diagnóstico pelo Console/Network. Solução: execução por servidor HTTP local.
2. **Hash inexistente**: rota inválida poderia deixar a tela vazia. Diagnóstico alterando manualmente o hash. Solução: view de rota não encontrada.
3. **localStorage inválido**: conteúdo corrompido poderia causar erro em `JSON.parse`. Diagnóstico inserindo manualmente valor inválido no DevTools. Solução: `try/catch`, validação de tipo e retorno de array vazio.
4. **Eventos em cards dinâmicos**: listeners individuais seriam perdidos após nova renderização. Solução: event delegation no contêiner `#app`.
5. **Formulário**: validação nativa anteriormente podia ser desativada. Solução: manter validação HTML5 ativa e complementar com classes visuais e `checkValidity()`.

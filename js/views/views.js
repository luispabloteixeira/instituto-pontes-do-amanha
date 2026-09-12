export function homeView() {
  return `
    <section class="hero" aria-labelledby="titulo-principal">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Educação • Tecnologia • Comunidade</p>
          <h1 id="titulo-principal">Criamos pontes para transformar futuros</h1>
          <p>Conectamos pessoas, conhecimento e oportunidades por meio de ações educacionais e de inclusão digital.</p>
          <div class="actions"><a class="button" href="#/cadastro" data-route>Quero participar</a><a class="button button-secondary" href="#/projetos" data-route>Conheça os projetos</a></div>
        </div>
        <div class="hero-visual">
          <figure class="hero-media"><picture><source srcset="../imagens/oficina-comunitaria.webp" type="image/webp"><source srcset="../imagens/oficina-comunitaria.jpg" type="image/jpeg"><img src="../imagens/oficina-comunitaria.png" width="1024" height="510" alt="Crianças, jovens e voluntários participando de atividades educativas com livros e computadores em um espaço comunitário acessível"></picture></figure>
          <aside class="impact-card" aria-label="Indicadores de impacto"><strong>Nosso impacto</strong><dl><div><dt>Famílias atendidas</dt><dd>480+</dd></div><div><dt>Voluntários</dt><dd>75</dd></div><div><dt>Oficinas realizadas</dt><dd>120</dd></div></dl></aside>
        </div>
      </div>
    </section>
    <section class="section container" aria-labelledby="missao"><h2 id="missao">Nossa missão</h2><p class="lead">Promover autonomia e cidadania, fortalecendo comunidades por meio da educação e do acesso responsável à tecnologia.</p><div class="cards"><article class="card"><h3>Educação acessível</h3><p>Reforço escolar e oficinas que respeitam diferentes ritmos de aprendizagem.</p></article><article class="card"><h3>Inclusão digital</h3><p>Formação prática para uso seguro de computadores, internet e serviços digitais.</p></article><article class="card"><h3>Rede solidária</h3><p>Mobilização de voluntários e parceiros em ações orientadas por necessidades locais.</p></article></div></section>
    <section class="section section-accent" aria-labelledby="como-ajudar"><div class="container"><h2 id="como-ajudar">Toda participação gera impacto</h2><p>Você pode contribuir como voluntário, doador ou parceiro institucional.</p><a class="button" href="#/cadastro" data-route>Fazer parte da rede</a></div></section>
    <section class="section container contact-section" aria-labelledby="contato"><div><p class="eyebrow">Fale conosco</p><h2 id="contato">Dados de contato</h2><p>Entre em contato para conhecer as iniciativas ou participar das atividades.</p></div><address class="contact-card"><p><strong>E-mail:</strong> contato@pontesdoamanha.org.br</p><p><strong>Telefone:</strong> (15) 3234-1234</p><p><strong>Endereço:</strong> Rua das Oportunidades, 120, Centro, Sorocaba - SP</p></address></section>`;
}

export function projectsView() {
  return `
    <section class="section container" aria-labelledby="projetos-titulo">
      <header class="page-header"><p class="eyebrow">Iniciativas solidárias</p><h1 id="projetos-titulo">Projetos que aproximam oportunidades</h1><p class="lead">Os cards abaixo são gerados por Template Literals a partir de um array JavaScript.</p></header>
      <figure class="project-media"><picture><source srcset="../imagens/oficina-comunitaria.webp" type="image/webp"><source srcset="../imagens/oficina-comunitaria.jpg" type="image/jpeg"><img src="../imagens/oficina-comunitaria.png" width="1024" height="510" alt="Atividade educativa e de inclusão digital em espaço comunitário"></picture><figcaption>Oficinas educativas e de inclusão digital.</figcaption></figure>
      <section id="projects-list" class="cards" aria-label="Lista de projetos"></section>
      <p class="storage-note">Os projetos marcados como interesse são armazenados somente neste navegador por meio de localStorage. Dados pessoais do formulário não são armazenados.</p>
      <section class="participation" aria-labelledby="formas-participacao"><h2 id="formas-participacao">Formas de participação</h2><div class="participation-grid"><article class="card"><span class="badge badge-primary">Doe seu tempo</span><h3>Voluntariado</h3><p>Apoie atividades educacionais, oficinas e ações comunitárias.</p><a class="button" href="#/cadastro" data-route>Quero ser voluntário</a></article><article class="card"><span class="badge badge-info">Apoie uma causa</span><h3>Doações</h3><p>Registre seu interesse para conhecer campanhas e necessidades atuais.</p><a class="button" href="#/cadastro" data-route>Quero apoiar</a></article></div></section>
    </section>`;
}

export function cadastroView() {
  return `
    <section class="section container narrow" aria-labelledby="cadastro-titulo">
      <header class="page-header"><p class="eyebrow">Faça parte</p><h1 id="cadastro-titulo">Cadastro de interesse</h1><p class="lead">Utilize dados fictícios para experimentar as validações. Nenhuma informação pessoal é enviada ou persistida.</p></header>
      <div class="alert alert-info form-notice" role="note"><strong>Validação ativa</strong><p>Campos obrigatórios, padrões de CPF, telefone e CEP são verificados antes da conclusão.</p></div>
      <form id="cadastro">
        <fieldset><legend>Dados pessoais</legend><div class="form-grid">
          <label for="nome">Nome completo *<input id="nome" type="text" name="nome" autocomplete="name" minlength="3" required></label>
          <label for="nascimento">Data de nascimento *<input id="nascimento" type="date" name="nascimento" autocomplete="bday" required></label>
          <label for="email">E-mail *<input id="email" type="email" name="email" autocomplete="email" required></label>
          <label for="cpf">CPF *<input id="cpf" type="text" name="cpf" inputmode="numeric" maxlength="14" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" required title="Use 000.000.000-00 (11 dígitos)."></label>
          <label for="telefone">Telefone *<input id="telefone" type="tel" name="telefone" autocomplete="tel" maxlength="15" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" placeholder="(00) 00000-0000" required title="Use (00) 0000-0000 ou (00) 00000-0000."></label>
        </div></fieldset>
        <fieldset><legend>Endereço</legend><div class="form-grid">
          <label for="cep">CEP *<input id="cep" type="text" name="cep" inputmode="numeric" maxlength="9" pattern="\\d{5}-\\d{3}" placeholder="00000-000" required></label>
          <label for="logradouro">Logradouro *<input id="logradouro" type="text" name="logradouro" maxlength="150" required></label>
          <label for="numero">Número *<input id="numero" type="text" name="numero" maxlength="20" required></label>
          <label for="cidade">Cidade *<input id="cidade" type="text" name="cidade" required></label>
          <label for="estado">Estado *<select id="estado" name="estado" required><option value="">Selecione</option><option value="SP">SP</option><option value="MG">MG</option><option value="RJ">RJ</option><option value="PR">PR</option><option value="SC">SC</option><option value="RS">RS</option><option value="BA">BA</option><option value="PE">PE</option><option value="CE">CE</option><option value="GO">GO</option><option value="DF">DF</option></select></label>
        </div></fieldset>
        <fieldset><legend>Forma de participação</legend>
          <label for="participacao">Como deseja colaborar? *<select id="participacao" name="participacao" required><option value="">Selecione</option><option value="voluntariado">Voluntariado</option><option value="doacao">Doação</option><option value="parceria">Parceria institucional</option></select></label>
          <label for="interesse">Área de interesse<textarea id="interesse" name="interesse" rows="4" maxlength="500" placeholder="Conte brevemente como gostaria de participar"></textarea></label>
          <label class="check" for="consentimento"><input id="consentimento" type="checkbox" name="consentimento" required> Concordo com o uso destes dados exclusivamente para esta demonstração. *</label>
        </fieldset>
        <p id="form-status" class="status" role="status" aria-live="polite"></p>
        <button class="button" type="submit">Validar cadastro</button>
      </form>
    </section>`;
}

export function componentsView() {
  return `
    <section class="section container" aria-labelledby="componentes-titulo">
      <header class="page-header"><p class="eyebrow">Instituto Pontes do Amanhã</p><h1 id="componentes-titulo">Comunicação clara em cada etapa</h1><p class="lead">Guia interativo de componentes de feedback alinhados ao design system do projeto.</p></header>
      <div class="feedback-grid">
        <section class="card"><h2>Etiquetas dos projetos</h2><div class="badge-list"><span class="badge badge-primary">Educação</span><span class="badge badge-info">Inclusão digital</span><span class="badge badge-neutral">Comunidade</span><span class="badge badge-success">Inscrições abertas</span><span class="badge badge-warning">Últimas vagas</span></div></section>
        <section class="card"><h2>Alertas de orientação</h2><div class="alert alert-info"><strong>Informação</strong><p>Escolha um projeto para conhecer as formas de participação.</p></div><div class="alert alert-success"><strong>Sucesso</strong><p>A ação foi concluída.</p></div><div class="alert alert-error"><strong>Erro</strong><p>Confira o formato dos dados.</p></div></section>
        <section class="card"><h2>Notificações e confirmação</h2><div class="actions"><button class="button" type="button" data-action="show-demo-toast">Exibir notificação</button><button class="button button-secondary" type="button" data-action="open-guidance">Ver orientações</button></div></section>
        <section class="card"><h2>Estados dos botões</h2><div class="actions"><a class="button" href="#/cadastro" data-route>Participar</a><button class="button" type="button" disabled>Inscrições indisponíveis</button></div></section>
      </div>
      <dialog id="guidance-dialog" aria-labelledby="dialog-title"><span class="badge badge-info">Antes de participar</span><h2 id="dialog-title">Como funciona o cadastro?</h2><p>Preencha apenas dados fictícios. Este projeto não transmite dados a um servidor.</p><form method="dialog" class="dialog-actions"><button class="button" autofocus>Entendi, fechar</button></form></dialog>
    </section>`;
}

export function notFoundView() {
  return `<section class="section container route-error"><p class="eyebrow">Rota não encontrada</p><h1>Página não encontrada</h1><p>A rota informada não existe nesta SPA.</p><a class="button" href="#/inicio" data-route>Voltar ao início</a></section>`;
}

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASE_URL = 'http://127.0.0.1:4173';
const APP_URL = `${BASE_URL}/html/index.html#/inicio`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer(url, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Servidor de preview não respondeu em ${url}`);
}

const preview = spawn('npm', ['run', 'preview', '--', '--port', '4173', '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

preview.stdout.on('data', (chunk) => process.stdout.write(chunk));
preview.stderr.on('data', (chunk) => process.stderr.write(chunk));

let browser;
const summary = [];
const failedResponses = [];

try {
  await waitForServer(`${BASE_URL}/html/`);
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  page.on('response', (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto(APP_URL, { waitUntil: 'networkidle' });
  await page.locator('#app h1').waitFor();

  // Landmarks essenciais.
  assert(await page.locator('header').count() === 1, 'Landmark <header> ausente.');
  assert(await page.locator('nav[aria-label="Navegação principal"]').count() === 1, 'Landmark <nav> sem nome acessível.');
  assert(await page.locator('main#app').count() === 1, 'Landmark <main> ausente.');
  assert(await page.locator('footer').count() === 1, 'Landmark <footer> ausente.');
  summary.push('Landmarks semânticos: OK');

  // Ordem de tabulação e link de salto.
  const firstFocusable = await page.evaluate(() => {
    const selector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const nodes = [...document.querySelectorAll(selector)].filter((element) => {
      const style = getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    return nodes[0]?.className || '';
  });
  assert(firstFocusable.includes('skip-link'), 'O link de salto não é o primeiro elemento na ordem lógica de tabulação.');

  const skipLink = page.locator('.skip-link');
  await skipLink.focus();
  const skipFocusStyle = await skipLink.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      left: style.left,
      borderWidth: parseFloat(style.borderTopWidth) || 0,
      outlineWidth: parseFloat(style.outlineWidth) || 0,
      outlineStyle: style.outlineStyle,
    };
  });
  assert(skipFocusStyle.left !== '-9999px', 'O link de salto continua fora do ecrã quando recebe foco.');
  assert(skipFocusStyle.borderWidth >= 2 || (skipFocusStyle.outlineStyle !== 'none' && skipFocusStyle.outlineWidth >= 2), 'O link de salto não apresenta foco visual suficiente.');
  const routeBeforeSkip = await page.evaluate(() => location.hash);
  await page.keyboard.press('Enter');
  assert(await page.evaluate(() => location.hash) === routeBeforeSkip, 'O link de salto alterou indevidamente a rota da SPA.');
  assert(await page.locator('#app').evaluate((el) => el === document.activeElement), 'O link de salto não moveu o foco para o conteúdo principal.');
  summary.push('Ordem de foco, link de salto e foco visível: OK');

  // Menu hambúrguer no viewport móvel.
  const menuToggle = page.locator('.menu-toggle');
  await menuToggle.focus();
  await page.keyboard.press('Enter');
  assert(await menuToggle.getAttribute('aria-expanded') === 'true', 'Menu hambúrguer não informou estado aberto.');
  assert(await page.locator('#menu').evaluate((el) => el.classList.contains('open')), 'Menu hambúrguer não abriu pelo teclado.');
  await page.keyboard.press('Escape');
  assert(await menuToggle.getAttribute('aria-expanded') === 'false', 'Menu hambúrguer não fechou com Escape.');
  assert(await menuToggle.evaluate((el) => el === document.activeElement), 'Foco não retornou ao botão do menu após Escape.');
  summary.push('Menu hambúrguer por teclado: OK');

  // Dropdown.
  await menuToggle.focus();
  await page.keyboard.press('Enter');
  const dropdown = page.locator('.dropdown-toggle');
  await dropdown.focus();
  await page.keyboard.press('Enter');
  assert(await dropdown.getAttribute('aria-expanded') === 'true', 'Dropdown não informou estado aberto.');
  assert(!(await page.locator('#submenu-participar').getAttribute('hidden')), 'Submenu permaneceu oculto após abertura.');
  await page.keyboard.press('Escape');
  assert(await dropdown.getAttribute('aria-expanded') === 'false', 'Dropdown não fechou com Escape.');
  assert(await dropdown.evaluate((el) => el === document.activeElement), 'Foco não retornou ao botão do dropdown.');
  summary.push('Dropdown por teclado: OK');

  // Imagens de produção: devem existir e carregar de verdade.
  await page.goto(APP_URL, { waitUntil: 'networkidle' });
  const images = await page.locator('img').evaluateAll((nodes) => nodes.map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  })));
  assert(images.length > 0, 'Nenhuma imagem encontrada na aplicação.');
  for (const image of images) {
    assert(image.alt.trim().length > 0, `Imagem sem texto alternativo: ${image.src}`);
    assert(image.complete && image.naturalWidth > 0 && image.naturalHeight > 0, `Imagem não carregou: ${image.src}`);
  }
  summary.push('Imagens e textos alternativos: OK');

  // Formulário: nomes acessíveis, agrupamentos e validação anunciável.
  await page.goto(`${BASE_URL}/html/index.html#/cadastro`, { waitUntil: 'networkidle' });
  const labels = ['Nome completo *', 'Data de nascimento *', 'E-mail *', 'CPF *', 'Telefone *', 'CEP *', 'Logradouro *', 'Número *', 'Cidade *', 'Estado *', 'Como deseja colaborar? *', 'Área de interesse'];
  for (const label of labels) {
    assert(await page.getByLabel(label, { exact: true }).count() === 1, `Campo sem nome acessível correto: ${label}`);
  }
  assert(await page.locator('fieldset').count() === 3, 'Agrupamentos fieldset esperados não foram encontrados.');
  assert(await page.locator('fieldset legend').count() === 3, 'Legendas dos fieldsets não foram encontradas.');
  assert(await page.locator('#form-status[role="status"][aria-live="polite"]').count() === 1, 'Região de estado do formulário não está configurada para leitor de ecrã.');
  await page.getByRole('button', { name: 'Validar cadastro' }).click();
  assert(await page.locator('#nome').getAttribute('aria-invalid') === 'true', 'Campo inválido não recebeu aria-invalid.');
  assert((await page.locator('#form-status').textContent()).includes('Revise os campos'), 'Erro de validação não foi anunciado na região de estado.');
  summary.push('Formulário e validação acessível: OK');

  // Árvore de acessibilidade usada por leitores de ecrã.
  const cdp = await page.context().newCDPSession(page);
  const axTree = await cdp.send('Accessibility.getFullAXTree');
  const accessibleNodes = axTree.nodes.filter((node) => !node.ignored).map((node) => ({
    role: node.role?.value,
    name: node.name?.value || '',
  }));
  assert(accessibleNodes.some((node) => node.role === 'main'), 'A árvore de acessibilidade não contém a região main.');
  assert(accessibleNodes.some((node) => node.role === 'navigation' && node.name.includes('Navegação principal')), 'A navegação principal não possui nome na árvore de acessibilidade.');
  assert(accessibleNodes.some((node) => node.role === 'textbox' && node.name.includes('Nome completo')), 'O campo Nome completo não possui nome na árvore de acessibilidade.');
  assert(accessibleNodes.some((node) => node.role === 'status'), 'A região role=status não aparece na árvore de acessibilidade.');
  summary.push('Árvore de acessibilidade para leitores de ecrã: OK');

  // Modal nativo: nome acessível, foco e Escape.
  await page.goto(`${BASE_URL}/html/index.html#/componentes`, { waitUntil: 'networkidle' });
  const opener = page.getByRole('button', { name: 'Ver orientações' });
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Como funciona o cadastro?' });
  await dialog.waitFor({ state: 'visible' });
  assert(await page.getByRole('button', { name: 'Entendi, fechar' }).evaluate((el) => el === document.activeElement), 'Foco inicial do modal não foi direcionado ao controlo interno.');
  const modalTree = await cdp.send('Accessibility.getFullAXTree');
  assert(modalTree.nodes.some((node) => !node.ignored && node.role?.value === 'dialog' && node.name?.value === 'Como funciona o cadastro?'), 'Modal não possui nome correto na árvore de acessibilidade.');
  await page.keyboard.press('Escape');
  assert(!(await dialog.isVisible()), 'Modal não fechou com Escape.');
  assert(await opener.evaluate((el) => el === document.activeElement), 'Foco não retornou ao botão que abriu o modal.');
  summary.push('Modal, foco e Escape: OK');

  // Toast anunciado sem retirar o foco.
  const toastButton = page.getByRole('button', { name: 'Exibir notificação' });
  await toastButton.focus();
  await page.keyboard.press('Enter');
  assert(await page.locator('.toast-region[aria-live="polite"][aria-atomic="true"]').count() === 1, 'Toast não está numa região viva acessível.');
  assert(await toastButton.evaluate((el) => el === document.activeElement), 'Toast retirou o foco do botão acionador.');
  summary.push('Toast e região aria-live: OK');

  // Axe WCAG 2.1 A/AA nas rotas principais.
  const routes = ['inicio', 'projetos', 'cadastro', 'componentes'];
  for (const route of routes) {
    await page.goto(`${BASE_URL}/html/index.html#/${route}`, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    if (results.violations.length) {
      const details = results.violations.map((violation) => `${violation.id}: ${violation.help} (${violation.nodes.length})`).join('; ');
      throw new Error(`Axe encontrou violações na rota ${route}: ${details}`);
    }
  }
  summary.push('Axe WCAG 2.1 A/AA nas quatro rotas: OK');

  assert(failedResponses.length === 0, `Recursos HTTP falharam: ${failedResponses.join(', ')}`);
  summary.push('Recursos HTTP da build: OK');

  console.log('\nVALIDAÇÃO FINAL DE ACESSIBILIDADE');
  summary.forEach((item) => console.log(`✓ ${item}`));
  console.log('Resultado: todos os testes automatizados passaram.');
} finally {
  if (browser) await browser.close();
  preview.kill('SIGTERM');
}

/**
 * ui.js — Interface do usuário: transição de telas, HUD, feedback visual.
 * Depende de: window.Armazenamento, window.Entrada, window.Colisao, window.Som
 * Expõe: window.UI
 */

// ============================================================
// Referências ao DOM
// ============================================================
const telas = {
  menu:     document.getElementById('tela-menu'),
  jogo:     document.getElementById('tela-jogo'),
  pausa:    document.getElementById('tela-pausa'),
  gameOver: document.getElementById('tela-game-over'),
};

const hud = {
  score:      document.getElementById('hud-score'),
  combo:      document.getElementById('hud-combo'),
  reputacao:  document.getElementById('hud-reputacao'),
  accuracy:   document.getElementById('hud-accuracy'),
};

const els = {
  feedback:         document.getElementById('feedback-acerto'),
  menuMelhorScore:  document.getElementById('menu-melhor-score'),
  gameOverScore:    document.getElementById('game-over-score'),
  gameOverAccuracy: document.getElementById('game-over-accuracy'),
  gameOverRecorde:  document.getElementById('game-over-recorde'),
  btnIniciar:       document.getElementById('btn-iniciar'),
  btnPausar:        document.getElementById('btn-pausar'),
  btnRetomar:       document.getElementById('btn-retomar'),
  btnSairPausa:     document.getElementById('btn-sair-pausa'),
  btnTentarNovamente: document.getElementById('btn-tentar-novamente'),
  btnMenuPrincipal: document.getElementById('btn-menu-principal'),
};

const zonasTecla = [0, 1, 2, 3].map(i => document.getElementById('zona-tecla-' + i));

// ============================================================
// Controle de telas
// ============================================================

/** @param {'menu'|'jogo'|'pausa'|'gameOver'} nome */
function mostrarTela(nome) {
  Object.entries(telas).forEach(([chave, el]) => {
    if (!el) return;
    if (chave === nome) {
      el.classList.remove('oculta');
      el.classList.add('ativa');
    } else {
      el.classList.remove('ativa');
      el.classList.add('oculta');
    }
  });
}

// ============================================================
// HUD
// ============================================================

function atualizarHUD() {
  const estado = window.Entrada ? window.Entrada.estadoJogador : null;
  if (!estado) return;

  hud.score.textContent   = estado.score;
  hud.combo.textContent   = 'x' + estado.combo;

  const pct = window.Colisao
    ? window.Colisao.percentualPrecisao(estado.accuracy)
    : 100;
  hud.accuracy.textContent = pct + '%';

  _renderizarCoracoes(estado.reputation, estado.maxReputation);
}

function _renderizarCoracoes(atual, maximo) {
  hud.reputacao.innerHTML = '';
  for (let i = 0; i < maximo; i++) {
    const span = document.createElement('span');
    span.classList.add('coracao');
    if (i >= atual) span.classList.add('vazio');
    span.textContent = '♥';
    hud.reputacao.appendChild(span);
  }
}

// ============================================================
// Feedback de timing
// ============================================================

let _feedbackTimeout = null;

/** @param {'perfect'|'good'|'miss'} tipo */
function mostrarFeedback(tipo) {
  const el = els.feedback;
  if (!el) return;

  // Remove classes anteriores e para animação em curso
  el.classList.remove('perfeito', 'bom', 'errou');
  // Força reflow para reiniciar a animação
  void el.offsetWidth;

  if (tipo === 'perfect') {
    el.textContent = 'PERFECT!';
    el.classList.add('perfeito');
  } else if (tipo === 'good') {
    el.textContent = 'GOOD';
    el.classList.add('bom');
  } else {
    el.textContent = 'MISS';
    el.classList.add('errou');
  }

  if (_feedbackTimeout) clearTimeout(_feedbackTimeout);
  _feedbackTimeout = setTimeout(() => {
    el.classList.remove('perfeito', 'bom', 'errou');
    el.textContent = '';
  }, 700);
}

// ============================================================
// Feedback visual nas teclas (pressionada / solta)
// ============================================================

/** @param {number} lane índice 0–3 */
function teclaPressinada(lane) {
  const el = zonasTecla[lane];
  if (el) el.classList.add('pressionada');
}

/** @param {number} lane índice 0–3 */
function teclaSolta(lane) {
  const el = zonasTecla[lane];
  if (el) el.classList.remove('pressionada');
}

// ============================================================
// Menu inicial
// ============================================================

function atualizarMenuRecorde() {
  if (window.Armazenamento && els.menuMelhorScore) {
    els.menuMelhorScore.textContent = window.Armazenamento.obterMelhorPontuacao();
  }
}

/** @returns {'facil'|'medio'|'dificil'} */
function obterDificuldadeSelecionada() {
  const input = document.querySelector('input[name="dificuldade"]:checked');
  return input ? input.value : 'medio';
}

// ============================================================
// Tela de Game Over
// ============================================================

/**
 * @param {number} score
 * @param {{ hits: number, total: number }} accuracy
 */
function mostrarGameOver(score, accuracy) {
  const pct = window.Colisao
    ? window.Colisao.percentualPrecisao(accuracy)
    : 100;

  const recorde = window.Armazenamento
    ? window.Armazenamento.obterMelhorPontuacao()
    : 0;

  if (els.gameOverScore)    els.gameOverScore.textContent    = score;
  if (els.gameOverAccuracy) els.gameOverAccuracy.textContent = pct + '%';
  if (els.gameOverRecorde)  els.gameOverRecorde.textContent  = recorde;

  mostrarTela('gameOver');
}

// ============================================================
// Listeners dos botões
// ============================================================

/** Callback chamado por main.js para conectar os botões ao game loop */
function registrarCallbacks({ aoIniciar, aoPausar, aoRetomar, aoSair, aoReiniciar, aoMenuPrincipal }) {
  if (els.btnIniciar) {
    els.btnIniciar.addEventListener('click', () => {
      if (window.Som) window.Som.retomarAudio();
      atualizarMenuRecorde();
      if (typeof aoIniciar === 'function') aoIniciar(obterDificuldadeSelecionada());
    });
  }

  if (els.btnPausar) {
    els.btnPausar.addEventListener('click', () => {
      if (typeof aoPausar === 'function') aoPausar();
    });
  }

  if (els.btnRetomar) {
    els.btnRetomar.addEventListener('click', () => {
      if (typeof aoRetomar === 'function') aoRetomar();
    });
  }

  if (els.btnSairPausa) {
    els.btnSairPausa.addEventListener('click', () => {
      if (typeof aoSair === 'function') aoSair();
    });
  }

  if (els.btnTentarNovamente) {
    els.btnTentarNovamente.addEventListener('click', () => {
      if (window.Som) window.Som.retomarAudio();
      if (typeof aoReiniciar === 'function') aoReiniciar(obterDificuldadeSelecionada());
    });
  }

  if (els.btnMenuPrincipal) {
    els.btnMenuPrincipal.addEventListener('click', () => {
      if (typeof aoMenuPrincipal === 'function') aoMenuPrincipal();
      atualizarMenuRecorde();
      mostrarTela('menu');
    });
  }
}

// ============================================================
// Listeners de teclado para feedback visual nas teclas
// ============================================================

const TECLAS_VISUAIS = { a: 0, s: 1, d: 2, f: 3 };

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const lane = TECLAS_VISUAIS[e.key.toLowerCase()];
  if (lane !== undefined) teclaPressinada(lane);
});

window.addEventListener('keyup', (e) => {
  const lane = TECLAS_VISUAIS[e.key.toLowerCase()];
  if (lane !== undefined) teclaSolta(lane);
});

// ============================================================
// Inicialização
// ============================================================

atualizarMenuRecorde();
mostrarTela('menu');

// ============================================================
// Exportação
// ============================================================

window.UI = {
  mostrarTela,
  atualizarHUD,
  mostrarFeedback,
  teclaPressinada,
  teclaSolta,
  mostrarGameOver,
  obterDificuldadeSelecionada,
  atualizarMenuRecorde,
  registrarCallbacks,
};
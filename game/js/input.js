/**
 * Teclado + estado (score, combo, reputação, acurácia).
 * game.js chama iniciarEntrada com callback que recebe lane e faz verificarAcerto nas notas.
 */

/** @type {Record<string, number>} */
const TECLAS_PADRAO = { a: 0, s: 1, d: 2, f: 3 };

/** @type {Record<string, number>} */
let mapaTeclaParaFaixa = { ...TECLAS_PADRAO };

/**
 * @typedef {Object} EstadoJogador
 * @property {number} score
 * @property {number} combo
 * @property {number} reputation
 * @property {number} maxReputation
 * @property {{ hits: number, total: number }} accuracy
 */

/** @type {EstadoJogador} */
const estadoJogador = {
  score: 0,
  combo: 0,
  reputation: 5,
  maxReputation: 5,
  accuracy: { hits: 0, total: 0 },
};

/**
 * Volume do hit “comum” (0..1). Ritmo costuma usar SFX mais baixo que a música
 * para não poluir; suba se estiver inaudível ou baixe (ex. 0.25) se atrapalhar a trilha.
 */
let volumeSomAcerto = 0.38;

/** A cada N acertos consecutivos toca "combo" em vez de "hit". */
const INTERVALO_SOM_COMBO = 5;

function definirVolumeSomAcerto(volume) {
  volumeSomAcerto = Math.min(1, Math.max(0, volume));
}

/**
 * Erro precisa cortar acima da música para o jogador perceber; suba se ainda ficar baixo.
 */
let volumeSomErro = 0.92;

function definirVolumeSomErro(volume) {
  volumeSomErro = Math.min(1, Math.max(0, volume));
}

/**
 * @param {Record<string, number>} mapa teclas em minúsculo → índice da lane
 */
function definirMapaTeclas(mapa) {
  mapaTeclaParaFaixa = { ...TECLAS_PADRAO, ...mapa };
}

function resetarEstadoJogador() {
  estadoJogador.score = 0;
  estadoJogador.combo = 0;
  estadoJogador.reputation = estadoJogador.maxReputation;
  estadoJogador.accuracy = { hits: 0, total: 0 };
}

function multiplicadorCombo(combo) {
  if (combo <= 0) return 1;
  return 1 + Math.min(2, Math.floor(combo / 5) * 0.1);
}

/**
 * @param {"perfect"|"good"} qualidade
 */
function registrarAcerto(qualidade) {
  estadoJogador.combo += 1;
  const mult = multiplicadorCombo(estadoJogador.combo);
  const pts = window.Colisao
    ? window.Colisao.pontuacaoPorAcerto(qualidade, mult)
    : 0;
  estadoJogador.score += pts;
  if (window.Colisao)
    window.Colisao.registrarPrecisao(estadoJogador.accuracy, true);
  if (window.Som) {
    const marcoCombo =
      estadoJogador.combo >= INTERVALO_SOM_COMBO &&
      estadoJogador.combo % INTERVALO_SOM_COMBO === 0;
    if (marcoCombo) {
      window.Som.tocarSom("combo", 0.52);
    } else {
      window.Som.tocarSom("hit", volumeSomAcerto);
    }
  }
}

function registrarErro() {
  estadoJogador.combo = 0;
  estadoJogador.reputation = Math.max(0, estadoJogador.reputation - 1);
  if (window.Colisao)
    window.Colisao.registrarPrecisao(estadoJogador.accuracy, false);
  if (window.Som) window.Som.tocarSom("miss", volumeSomErro);
}

/**
 * @param {string} tecla ex.: e.key do evento
 * @param {(lane: number) => void} [aoPressionarFaixa] integração com game.js
 */
function tratarTeclaPressionada(tecla, aoPressionarFaixa) {
  const k = String(tecla).toLowerCase();
  const faixa = mapaTeclaParaFaixa[k];
  if (faixa === undefined) return;
  if (typeof aoPressionarFaixa === "function") aoPressionarFaixa(faixa);
}

/** @type {(ev: KeyboardEvent) => void} | null */
let manipuladorTeclado = null;

/**
 * @param {(lane: number) => void} aoPressionarFaixa
 */
function iniciarEntrada(aoPressionarFaixa) {
  if (manipuladorTeclado) window.removeEventListener("keydown", manipuladorTeclado);
  manipuladorTeclado = (e) => {
    if (e.repeat) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    tratarTeclaPressionada(e.key, aoPressionarFaixa);
  };
  window.addEventListener("keydown", manipuladorTeclado);
}

function encerrarEntrada() {
  if (manipuladorTeclado) {
    window.removeEventListener("keydown", manipuladorTeclado);
    manipuladorTeclado = null;
  }
}

window.Entrada = {
  TECLAS_PADRAO,
  estadoJogador,
  INTERVALO_SOM_COMBO,
  definirVolumeSomAcerto,
  definirVolumeSomErro,
  definirMapaTeclas,
  resetarEstadoJogador,
  multiplicadorCombo,
  registrarAcerto,
  registrarErro,
  tratarTeclaPressionada,
  iniciarEntrada,
  encerrarEntrada,
};

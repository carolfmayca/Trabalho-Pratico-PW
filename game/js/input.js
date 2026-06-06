/** @type {Record<string, number>} */
const TECLAS_PADRAO = { arrowleft: 0, arrowdown: 1, arrowup: 2, arrowright: 3 };

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
  powerUpMultiplicador: 1,
};

let powerUpAtivo = false;
let powerUpTimeout = null;
let contagemAcertosParaBonus = 0;

let volumeSomAcerto = 0.38;

const INTERVALO_SOM_COMBO = 5;

function definirVolumeSomAcerto(volume) {
  volumeSomAcerto = Math.min(1, Math.max(0, volume));
}

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

function ativarPowerUp(duracao = 10000) {
  powerUpAtivo = true;
  estadoJogador.powerUpMultiplicador = 2;
  if (powerUpTimeout) clearTimeout(powerUpTimeout);
  powerUpTimeout = setTimeout(() => desativarPowerUp(), duracao);
  if (window.UI?.ativarPowerUpVisual) window.UI.ativarPowerUpVisual();
  if (window.Som) window.Som.tocarSom('powerup', 0.6);

  if (window.Notas) {
    const notasAtivas = window.Notas.obterNotasAtivas();
    notasAtivas.forEach(nota => {
      if (nota.type === 'powerup' && !nota.consumed) {
        nota.consumed = true;
        if (nota.element) nota.element.remove();
      }
    });
  }
}

function desativarPowerUp() {
  powerUpAtivo = false;
  estadoJogador.powerUpMultiplicador = 1;
  if (window.UI?.desativarPowerUpVisual) window.UI.desativarPowerUpVisual();
}

/**
 * @param {"perfect"|"great"|"good"|"ok"} qualidade
 */
function registrarAcerto(qualidade) {
  estadoJogador.combo += 1;
  contagemAcertosParaBonus += 1;

  const mult = multiplicadorCombo(estadoJogador.combo);
  const pts = window.Colisao
    ? window.Colisao.pontuacaoPorAcerto(qualidade, mult) * estadoJogador.powerUpMultiplicador
    : 0;
  estadoJogador.score += pts;

  if (contagemAcertosParaBonus >= 20 && estadoJogador.reputation < estadoJogador.maxReputation) {
    estadoJogador.reputation += 1;
    contagemAcertosParaBonus = 0;
    if (window.UI?.mostrarBonusVida) window.UI.mostrarBonusVida();
  }

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
  if (powerUpAtivo) desativarPowerUp();
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
 * @param {() => void} [aoSoltarEsc] callback para quando ESC é pressionado
 */
function iniciarEntrada(aoPressionarFaixa, aoSoltarEsc) {
  if (manipuladorTeclado) window.removeEventListener("keydown", manipuladorTeclado);
  manipuladorTeclado = (e) => {
    if (e.repeat) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    if (["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"].includes(e.key)) e.preventDefault();
    
    // Captura ESC para pause/retomar
    if (e.key === "Escape") {
      if (typeof aoSoltarEsc === "function") aoSoltarEsc();
      return;
    }
    
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
  ativarPowerUp,
  desativarPowerUp,
};

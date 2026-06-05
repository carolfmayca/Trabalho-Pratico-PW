const CAMINHOS_SFX = {
  hit: "assets/audio/hit.wav",
  miss: "assets/audio/miss.wav",
  combo: "assets/audio/combo.wav",
  powerup: "assets/audio/combo.wav",
};

const CAMINHO_MUSICA_PADRAO = "assets/audio/Feather.mp3";

const PRESETS_BIP = {
  hit: { freq: 880, duration: 0.06 },
  miss: { freq: 180, duration: 0.12 },
  combo: { freq: 1200, duration: 0.05 },
  powerup: { freq: 1600, duration: 0.15 },
};

const VERSAO_SFX = 2;

/** @type {Record<string, HTMLAudioElement>} */
const cacheSfx = {};

function montarUrlSfx(caminhoRelativo) {
  const u = new URL(caminhoRelativo, window.location.href);
  u.searchParams.set("v", String(VERSAO_SFX));
  return u.href;
}

/** @type {HTMLAudioElement | null} */
let elementoMusica = null;

/** @type {AudioContext | null} */
let contextoAudio = null;

function obterContextoAudio() {
  if (!contextoAudio) {
    const AC = window.AudioContext || window.webkitAudioContext;
    contextoAudio = AC ? new AC() : null;
  }
  return contextoAudio;
}

function retomarAudio() {
  const ctx = obterContextoAudio();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => { });
  }
}

/**
 * @param {number} freq
 * @param {number} duration segundos
 */
function tocarBip(freq, duration) {
  const ctx = obterContextoAudio();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = "square";
  const t0 = ctx.currentTime;
  const vol = 0.12;
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.01, t0 + duration);
  osc.start(t0);
  osc.stop(t0 + duration);
}

/**
 * @param {keyof typeof CAMINHOS_SFX} nome
 * @param {number} [volume=0.7]
 */
function tocarSom(nome, volume = 0.7) {
  retomarAudio();
  const caminho = CAMINHOS_SFX[nome];
  const preset = PRESETS_BIP[nome];
  if (!caminho || !preset) return;

  let el = cacheSfx[nome];
  if (!el) {
    el = new Audio();
    cacheSfx[nome] = el;
  }
  const href = montarUrlSfx(caminho);
  if (el.src !== href) {
    el.src = href;
  }
  el.volume = Math.min(1, Math.max(0, volume));
  el.currentTime = 0;

  const fallback = () => {
    tocarBip(preset.freq, preset.duration);
  };

  el.onerror = () => {
    console.warn("[Som] arquivo SFX indisponível ou inválido:", caminho, "— usando bip.");
    fallback();
  };
  el.play().catch((e) => {
    console.warn("[Som] play() falhou:", nome, e);
    fallback();
  });
}

/**
 * @param {string} [src]
 * @param {number} [volume=0.35]
 */
function tocarMusica(src = CAMINHO_MUSICA_PADRAO, volume = 0.35) {
  retomarAudio();
  if (!elementoMusica) {
    elementoMusica = new Audio(src);
    elementoMusica.loop = true;
  } else {
    try {
      const urlCompleta = new URL(src, window.location.href).href;
      if (elementoMusica.src !== urlCompleta) {
        elementoMusica.src = src;
      }
    } catch {
      elementoMusica.src = src;
    }
  }
  elementoMusica.volume = Math.min(1, Math.max(0, volume));
  elementoMusica.currentTime = 0;
  elementoMusica.play().catch(() => { });
}

function pausarMusica() {
  if (elementoMusica) elementoMusica.pause();
}

function retomarMusica() {
  if (elementoMusica) {
    elementoMusica.play().catch(() => { });
  }
}

function definirVolumeMusica(v) {
  if (elementoMusica) elementoMusica.volume = Math.min(1, Math.max(0, v));
}

/**
 * @param {keyof typeof CAMINHOS_SFX} nome
 */
function precarregarSom(nome) {
  const caminho = CAMINHOS_SFX[nome];
  if (!caminho) return;
  let el = cacheSfx[nome];
  if (!el) {
    el = new Audio();
    cacheSfx[nome] = el;
  }
  el.src = montarUrlSfx(caminho);
  el.preload = "auto";
}

window.Som = {
  CAMINHOS_SFX,
  VERSAO_SFX,
  CAMINHO_MUSICA_PADRAO,
  PRESETS_BIP,
  precarregarSom,
  tocarSom,
  tocarBip,
  tocarMusica,
  pausarMusica,
  retomarMusica,
  definirVolumeMusica,
  retomarAudio,
};

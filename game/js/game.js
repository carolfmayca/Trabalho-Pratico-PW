// Loop principal do jogo e controle de estados.

const ESTADOS = {
  MENU: 'menu',
  JOGANDO: 'playing',
  PAUSADO: 'paused',
  GAME_OVER: 'gameover'
};

let estadoAtual = ESTADOS.MENU;

// VARIÁVEIS DO JOGO
let beatmapAtual = null;
let dificuldadeAtual = 'easy';
let musicaAtual = 'feather';

let tempoInicio = 0;
let tempoDecorrido = 0;
let ultimoFrame = 0;
let tempoAcumuladoPausa = 0;
let tempoPausa = 0;

let indiceProximaNota = 0;
let animationFrameId = null;
let fimJogoAgendado = false;

// Janelas de timing em ms (quanto o jogador pode errar para cada grau)
const JANELAS_TIMING = {
  perfect: 100,  // ±100ms → PERFECT
  great: 150,  // ±150ms → GREAT
  good: 200,  // ±200ms → GOOD
  // acima disso até o hitWindow da dificuldade → OK
};

/**
 * Retorna a qualidade do acerto baseada na diferença de tempo em ms.
 * @param {number} ms diferença absoluta entre hitTime e tempoDecorrido
 * @returns {'perfect'|'great'|'good'|'ok'}
 */
function calcularQualidadeTiming(ms) {
  if (ms <= JANELAS_TIMING.perfect) return 'perfect';
  if (ms <= JANELAS_TIMING.great) return 'great';
  if (ms <= JANELAS_TIMING.good) return 'good';
  return 'ok';
}

// INICIALIZAÇÃO

// Inicializa o jogo
function inicializarJogo() {
  console.log('[Game] Inicializando jogo...');

  // Inicializa módulos
  if (window.Notas) {
    window.Notas.inicializarNotas('area-jogo');
  }

  // Configura input
  if (window.Entrada) {
    window.Entrada.iniciarEntrada(processarTecla);
  }

  // seta zona de acerto
  if (window.Colisao) {
    window.Colisao.definirZonaAcerto({
      linhaAcertoY: 520,
      toleranciaPerfeita: 15,
      toleranciaBoa: 40
    });
  }

  estadoAtual = ESTADOS.MENU;
  console.log('[Game] Jogo inicializado');
}

// CONTROLE DE ESTADOS


function iniciarJogo(musica = 'feather', dificuldade = 'easy') {
  console.log(`[Game] Iniciando jogo - Música: ${musica}, Dificuldade: ${dificuldade}`);

  musicaAtual = musica;
  dificuldadeAtual = dificuldade;

  // carrega beatmap
  if (!window.Beatmaps) {
    console.error('[Game] Módulo Beatmaps não encontrado!');
    return;
  }

  beatmapAtual = window.Beatmaps.obterBeatmap(musica, dificuldade);
  if (!beatmapAtual) {
    console.error('[Game] Beatmap não encontrado!');
    return;
  }

  console.log(`[Game] Beatmap carregado: ${beatmapAtual.notas.length} notas`);

  if (window.Entrada) {
    window.Entrada.resetarEstadoJogador();
    const estado = window.Entrada.estadoJogador;
    estado.maxReputation = beatmapAtual.config.reputacaoInicial;
    estado.reputation = beatmapAtual.config.reputacaoInicial;
  }

  if (window.Notas) {
    window.Notas.limparNotas();
  }

  // Reseta timers
  tempoInicio = performance.now();
  tempoDecorrido = 0;
  ultimoFrame = tempoInicio;
  tempoAcumuladoPausa = 0;
  indiceProximaNota = 0;
  fimJogoAgendado = false;

  // Reseta flags de spawn
  beatmapAtual.notas.forEach(nota => {
    nota.spawned = false;
    nota.hit = false;
  });

  estadoAtual = ESTADOS.JOGANDO;

  // Inicia música
  if (window.Som) {
    window.Som.retomarAudio();
    window.Som.tocarMusica(beatmapAtual.arquivo, 0.35);
  }

  // Inicia loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  loopJogo(performance.now());

  console.log('[Game] Jogo iniciado!');
}

function pausarJogo() {
  if (estadoAtual !== ESTADOS.JOGANDO) return;

  console.log('[Game] Jogo pausado');
  estadoAtual = ESTADOS.PAUSADO;
  tempoPausa = performance.now();

  if (window.Som) {
    window.Som.pausarMusica();
  }
}

function retomarJogo() {
  if (estadoAtual !== ESTADOS.PAUSADO) return;

  console.log('[Game] Jogo retomado');

  // Ajusta com tempo de pausa
  const duracaoPausa = performance.now() - tempoPausa;
  tempoAcumuladoPausa += duracaoPausa;
  ultimoFrame = performance.now();

  estadoAtual = ESTADOS.JOGANDO;

  if (window.Som) {
    window.Som.retomarMusica();
  }

  loopJogo(performance.now());
}

function terminarJogo() {
  if (estadoAtual === ESTADOS.GAME_OVER) return;

  console.log('[Game] Game Over');
  estadoAtual = ESTADOS.GAME_OVER;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (window.Som) {
    window.Som.pausarMusica();
  }

  // Salva recorde
  if (window.Armazenamento && window.Entrada) {
    const estado = window.Entrada.estadoJogador;
    window.Armazenamento.salvarRecorde('Player', estado.score);
    console.log(`[Game] Pontuação final: ${estado.score}`);
    if (window.UI) window.UI.mostrarGameOver(estado.score, estado.accuracy);
  }

  if (window.Notas) {
    setTimeout(() => window.Notas.limparNotas(), 1000);
  }
}

function voltarMenu() {
  console.log('[Game] Voltando ao menu');

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (window.Som) {
    window.Som.pausarMusica();
  }

  if (window.Notas) {
    window.Notas.limparNotas();
  }

  estadoAtual = ESTADOS.MENU;
  beatmapAtual = null;
}

// LOOP PRINCIPAL

function loopJogo(timestamp) {
  if (estadoAtual !== ESTADOS.JOGANDO) {
    return; // Para o loop se não estiver jogando
  }

  tempoDecorrido = timestamp - tempoInicio - tempoAcumuladoPausa;

  spawnarNotas(tempoDecorrido);

  // Atualiza posição das notas
  if (window.Notas) {
    window.Notas.atualizarNotas(tempoDecorrido);
  }

  // Verifica notas perdidas
  verificarNotasPerdidas(tempoDecorrido);

  atualizarHUD();

  // Verifica fim do jogo
  verificarFimJogo(tempoDecorrido);

  ultimoFrame = timestamp;
  animationFrameId = requestAnimationFrame(loopJogo);
}

// SPAWN DE NOTAS

///baseado no beatmap e no tempo
function spawnarNotas(tempoDecorrido) {
  if (!beatmapAtual || !window.Notas) return;

  const notas = beatmapAtual.notas;
  const travelTime = beatmapAtual.config.travelTime;

  // Percorre notas ainda não spawnadas
  for (let i = indiceProximaNota; i < notas.length; i++) {
    const nota = notas[i];
    const tempoSpawn = nota.hitTime - travelTime;
    const powerUpAtivo = window.Entrada?.estadoJogador.powerUpMultiplicador === 2;

    if (nota.type === 'powerup' && powerUpAtivo) continue;

    if (tempoDecorrido >= tempoSpawn && !nota.spawned) {
      window.Notas.criarNota(nota, travelTime);
      nota.spawned = true;
      indiceProximaNota = i + 1;
    } else if (tempoDecorrido < tempoSpawn) {
      // Ainda não é hora de spawnar as próximas
      break;
    }
  }
}

// VERIFICAÇÕES

function verificarNotasPerdidas(tempoDecorrido) {
  if (!beatmapAtual || !window.Notas || !window.Entrada) return;

  const hitWindow = beatmapAtual.config.hitWindow;
  const notasPerdidas = window.Notas.verificarNotasPerdidas(tempoDecorrido, hitWindow);

  notasPerdidas.forEach(nota => {
    window.Entrada.registrarErro();

    // Remove nota após delay
    setTimeout(() => window.Notas.removerNota(nota), 500);
  });
}

function verificarFimJogo(tempoDecorrido) {
  if (!window.Entrada || !beatmapAtual || fimJogoAgendado) return;

  const estado = window.Entrada.estadoJogador;

  // Game over por reputação zerada
  if (estado.reputation <= 0) {
    console.log('[Game] Game Over: reputação zerada');
    fimJogoAgendado = true;
    terminarJogo();
    return;
  }

  // Fim natural da música (se todas as notas foram processadas OU tempo da música passou)
  const todasSpawnadas = indiceProximaNota >= beatmapAtual.notas.length;
  const nenhumaAtiva = window.Notas.contarNotasNaoProcessadas() === 0;
  const musicaTerminou = tempoDecorrido >= beatmapAtual.duracao;

  if (todasSpawnadas && nenhumaAtiva) {
    console.log(`[Game] Todas notas spawnadas (${indiceProximaNota}/${beatmapAtual.notas.length}) e nenhuma ativa`);
  }
  if (musicaTerminou) {
    console.log(`[Game] Música terminou (${tempoDecorrido}ms >= ${beatmapAtual.duracao}ms)`);
  }

  if ((todasSpawnadas && nenhumaAtiva) || musicaTerminou) {
    console.log('[Game] Fim de jogo acionado');
    fimJogoAgendado = true;
    // Espera um pouco antes de terminar
    setTimeout(() => terminarJogo(), 2000);
  }
}

// INPUT

function processarTecla(indiceLane) {
  if (estadoAtual !== ESTADOS.JOGANDO) return;
  if (!window.Notas || !window.Entrada || !beatmapAtual) return;

  const notasAtivas = window.Notas.obterNotasAtivas();
  const hitWindow = beatmapAtual.config.hitWindow;

  // Busca a nota mais próxima por timing (ms) na lane pressionada
  let melhorNota = null;
  let melhorDiff = Infinity;

  for (const nota of notasAtivas) {
    if (!nota || nota.hit || nota.missed || nota.consumed || nota.lane !== indiceLane) continue;
    const diff = Math.abs(nota.hitTime - tempoDecorrido);
    if (diff < melhorDiff) {
      melhorDiff = diff;
      melhorNota = nota;
    }
  }

  if (melhorNota && melhorDiff <= hitWindow) {
    const qualidade = calcularQualidadeTiming(melhorDiff);
    melhorNota.consumed = true;
    window.Entrada.registrarAcerto(qualidade);
    window.Notas.marcarNotaAcertada(melhorNota, qualidade);
    if (window.UI) window.UI.mostrarFeedback(qualidade);
    if (melhorNota.type === 'powerup') {
      window.Entrada.ativarPowerUp(10000);
    }
  } else {
    window.Entrada.registrarErro();
    if (window.UI) window.UI.mostrarFeedback('miss');
  }
}

// HUD

function atualizarHUD() {
  if (!window.Entrada) return;

  const estado = window.Entrada.estadoJogador;

  // Atualiza elementos do DOM 
  if (window.UI && window.UI.atualizarHUD) {
    window.UI.atualizarHUD(estado);
  } else {
    // erro
  }
}


// EXPORTS

window.Jogo = {
  ESTADOS,
  inicializarJogo,
  iniciarJogo,
  pausarJogo,
  retomarJogo,
  terminarJogo,
  voltarMenu,
  obterEstadoAtual: () => estadoAtual,
  obterBeatmapAtual: () => beatmapAtual,
  obterTempoDecorrido: () => tempoDecorrido
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarJogo);
} else {
  inicializarJogo();
}
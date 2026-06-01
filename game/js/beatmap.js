/**
 * Geração dinâmica de beatmaps.
 * A cada partida, um novo beatmap é gerado aleatoriamente.
 * A quantidade de notas varia conforme a dificuldade.
 */

const MUSICAS = {
  feather: {
    nome: "Feather",
    arquivo: "assets/audio/Feather.mp3",
    bpm: 128,
    duracao: 72000 // 1min12seg em ms
  }
};

// Quantidade de notas e intervalo mínimo entre notas por dificuldade
const NOTAS_POR_DIFICULDADE = {
  easy: { quantidade: 60, intervaloMin: 800 },
  medium: { quantidade: 100, intervaloMin: 500 },
  hard: { quantidade: 150, intervaloMin: 300 }
};

/**
 * Gera um beatmap aleatório para a música e dificuldade escolhidas.
 */
function gerarBeatmap(musica, dificuldade) {
  const infoMusica = MUSICAS[musica];
  if (!infoMusica) return null;

  const config = NOTAS_POR_DIFICULDADE[dificuldade];
  if (!config) return null;

  const { quantidade, intervaloMin } = config;
  const duracao = infoMusica.duracao;
  const inicioNotas = 1000; // primeira nota após 1s
  const fimNotas = duracao - 500; // última nota 500ms antes do fim

  const notas = [];
  const tempoDisponivel = fimNotas - inicioNotas;

  for (let i = 0; i < quantidade; i++) {
    const hitTime = inicioNotas + Math.round((tempoDisponivel / quantidade) * i + Math.random() * (intervaloMin * 0.5));
    const lane = Math.floor(Math.random() * 4);
    notas.push({ hitTime, lane });
  }

  // Ordena por tempo e garante intervalo mínimo entre notas
  notas.sort((a, b) => a.hitTime - b.hitTime);
  for (let i = 1; i < notas.length; i++) {
    if (notas[i].hitTime - notas[i - 1].hitTime < intervaloMin) {
      notas[i].hitTime = notas[i - 1].hitTime + intervaloMin;
    }
  }

  // Remove notas que passaram do tempo da música
  const notasValidas = notas.filter(n => n.hitTime <= fimNotas);

  return notasValidas;
}

const DIFICULDADES = {
  easy: {
    nome: "Fácil",
    travelTime: 2500,      // Tempo que nota leva para chegar (ms)
    hitWindow: 500,        // Janela de acerto (ms)
    reputacaoInicial: 5    // Vidas iniciais
  },
  medium: {
    nome: "Médio",
    travelTime: 2000,
    hitWindow: 400,
    reputacaoInicial: 4
  },
  hard: {
    nome: "Difícil",
    travelTime: 1500,
    hitWindow: 300,
    reputacaoInicial: 3
  }
};

function obterBeatmap(musica, dificuldade) {
  const infoMusica = MUSICAS[musica];
  if (!infoMusica) return null;

  const notas = gerarBeatmap(musica, dificuldade);
  if (!notas) return null;

  return {
    nome: infoMusica.nome,
    arquivo: infoMusica.arquivo,
    bpm: infoMusica.bpm,
    duracao: infoMusica.duracao,
    notas: notas.map(n => ({ ...n, spawned: false, hit: false })),
    config: DIFICULDADES[dificuldade]
  };
}

// no caso seria só feather i guess
function listarMusicas() {
  return Object.keys(MUSICAS).map(id => ({
    id,
    nome: MUSICAS[id].nome,
    duracao: MUSICAS[id].duracao,
    bpm: MUSICAS[id].bpm
  }));
}

window.Beatmaps = {
  MUSICAS,
  DIFICULDADES,
  NOTAS_POR_DIFICULDADE,
  obterBeatmap,
  gerarBeatmap,
  listarMusicas
};
/**
 * Beatmaps das músicas.
 * Cada nota tem: hitTime (ms desde início), lane (0-3 para A/S/D/F)
 */

const BEATMAPS = {
  feather: {
    nome: "Feather",
    arquivo: "assets/audio/Feather.mp3",
    bpm: 128,
    duracao: 72000, // 1min12seg em ms

    easy: [
      { hitTime: 1000, lane: 0 }, { hitTime: 1500, lane: 1 }, { hitTime: 2000, lane: 2 }, { hitTime: 2500, lane: 3 },
      { hitTime: 3500, lane: 1 }, { hitTime: 4000, lane: 2 }, { hitTime: 4500, lane: 3 }, { hitTime: 5000, lane: 0 },
      { hitTime: 6000, lane: 2 }, { hitTime: 6500, lane: 3 }, { hitTime: 7000, lane: 0 }, { hitTime: 7500, lane: 1 },
      { hitTime: 8500, lane: 0 }, { hitTime: 9000, lane: 1 }, { hitTime: 9500, lane: 2 }, { hitTime: 10000, lane: 3 },
      { hitTime: 11000, lane: 1 }, { hitTime: 11500, lane: 2 }, { hitTime: 12000, lane: 3 }, { hitTime: 12500, lane: 0 },
      { hitTime: 13500, lane: 2 }, { hitTime: 14000, lane: 3 }, { hitTime: 14500, lane: 0 }, { hitTime: 15000, lane: 1 },
      { hitTime: 16000, lane: 0 }, { hitTime: 16500, lane: 1 }, { hitTime: 17000, lane: 2 }, { hitTime: 17500, lane: 3 },
      { hitTime: 18500, lane: 1 }, { hitTime: 19000, lane: 2 }, { hitTime: 19500, lane: 3 }, { hitTime: 20000, lane: 0 },
      { hitTime: 21000, lane: 2 }, { hitTime: 21500, lane: 3 }, { hitTime: 22000, lane: 0 }, { hitTime: 22500, lane: 1 },
      { hitTime: 24000, lane: 0 }, { hitTime: 24500, lane: 1 }, { hitTime: 25000, lane: 2 }, { hitTime: 25500, lane: 3 },
      { hitTime: 27000, lane: 1 }, { hitTime: 28000, lane: 2 }, { hitTime: 29000, lane: 3 }, { hitTime: 30000, lane: 0 },
      { hitTime: 31500, lane: 0 }, { hitTime: 32500, lane: 1 }, { hitTime: 33500, lane: 2 }, { hitTime: 34500, lane: 3 },
      { hitTime: 36000, lane: 2 }, { hitTime: 37000, lane: 3 }, { hitTime: 38000, lane: 0 }, { hitTime: 39000, lane: 1 },
      { hitTime: 40500, lane: 1 }, { hitTime: 41500, lane: 2 }, { hitTime: 42500, lane: 3 }, { hitTime: 43500, lane: 0 },
      { hitTime: 45000, lane: 0 }, { hitTime: 46000, lane: 1 }, { hitTime: 47000, lane: 2 }, { hitTime: 48000, lane: 3 },
      { hitTime: 49500, lane: 2 }, { hitTime: 50500, lane: 3 }, { hitTime: 51500, lane: 0 }, { hitTime: 52500, lane: 1 },
      { hitTime: 54000, lane: 0 }, { hitTime: 55000, lane: 1 }, { hitTime: 56000, lane: 2 }, { hitTime: 57000, lane: 3 },
      { hitTime: 58500, lane: 1 }, { hitTime: 59500, lane: 2 }, { hitTime: 60500, lane: 3 }, { hitTime: 61500, lane: 0 },
      { hitTime: 63000, lane: 2 }, { hitTime: 64000, lane: 3 }, { hitTime: 65000, lane: 0 }, { hitTime: 66000, lane: 1 },
      { hitTime: 67500, lane: 0 }, { hitTime: 68500, lane: 1 }, { hitTime: 69500, lane: 2 }, { hitTime: 70500, lane: 3 },
      { hitTime: 72000, lane: 0 }
    ],

    medium: [
      { hitTime: 1000, lane: 0 }, { hitTime: 1500, lane: 1 }, { hitTime: 2000, lane: 2 }, { hitTime: 2500, lane: 3 },
      { hitTime: 3500, lane: 1 }, { hitTime: 4000, lane: 2 }, { hitTime: 4500, lane: 3 }, { hitTime: 5000, lane: 0 },
      { hitTime: 6000, lane: 2 }, { hitTime: 6500, lane: 3 }, { hitTime: 7000, lane: 0 }, { hitTime: 7500, lane: 1 },
      { hitTime: 8500, lane: 0 }, { hitTime: 9000, lane: 1 }, { hitTime: 9500, lane: 2 }, { hitTime: 10000, lane: 3 },
      { hitTime: 11000, lane: 1 }, { hitTime: 11500, lane: 2 }, { hitTime: 12000, lane: 3 }, { hitTime: 12500, lane: 0 },
      { hitTime: 13500, lane: 2 }, { hitTime: 14000, lane: 3 }, { hitTime: 14500, lane: 0 }, { hitTime: 15000, lane: 1 },
      { hitTime: 16000, lane: 0 }, { hitTime: 16500, lane: 1 }, { hitTime: 17000, lane: 2 }, { hitTime: 17500, lane: 3 },
      { hitTime: 18500, lane: 1 }, { hitTime: 19000, lane: 2 }, { hitTime: 19500, lane: 3 }, { hitTime: 20000, lane: 0 },
      { hitTime: 21000, lane: 2 }, { hitTime: 21500, lane: 3 }, { hitTime: 22000, lane: 0 }, { hitTime: 22500, lane: 1 },
      { hitTime: 24000, lane: 0 }, { hitTime: 24500, lane: 1 }, { hitTime: 25000, lane: 2 }, { hitTime: 25500, lane: 3 },
      { hitTime: 27000, lane: 1 }, { hitTime: 28000, lane: 2 }, { hitTime: 29000, lane: 3 }, { hitTime: 30000, lane: 0 },
      { hitTime: 31500, lane: 0 }, { hitTime: 32500, lane: 1 }, { hitTime: 33500, lane: 2 }, { hitTime: 34500, lane: 3 },
      { hitTime: 36000, lane: 2 }, { hitTime: 37000, lane: 3 }, { hitTime: 38000, lane: 0 }, { hitTime: 39000, lane: 1 },
      { hitTime: 40500, lane: 1 }, { hitTime: 41500, lane: 2 }, { hitTime: 42500, lane: 3 }, { hitTime: 43500, lane: 0 },
      { hitTime: 45000, lane: 0 }, { hitTime: 46000, lane: 1 }, { hitTime: 47000, lane: 2 }, { hitTime: 48000, lane: 3 },
      { hitTime: 49500, lane: 2 }, { hitTime: 50500, lane: 3 }, { hitTime: 51500, lane: 0 }, { hitTime: 52500, lane: 1 },
      { hitTime: 54000, lane: 0 }, { hitTime: 55000, lane: 1 }, { hitTime: 56000, lane: 2 }, { hitTime: 57000, lane: 3 },
      { hitTime: 58500, lane: 1 }, { hitTime: 59500, lane: 2 }, { hitTime: 60500, lane: 3 }, { hitTime: 61500, lane: 0 }
    ],

    hard: [
      { hitTime: 1000, lane: 0 }, { hitTime: 1500, lane: 1 }, { hitTime: 2000, lane: 2 }, { hitTime: 2500, lane: 3 },
      { hitTime: 3500, lane: 1 }, { hitTime: 4000, lane: 2 }, { hitTime: 4500, lane: 3 }, { hitTime: 5000, lane: 0 },
      { hitTime: 6000, lane: 2 }, { hitTime: 6500, lane: 3 }, { hitTime: 7000, lane: 0 }, { hitTime: 7500, lane: 1 },
      { hitTime: 8500, lane: 0 }, { hitTime: 9000, lane: 1 }, { hitTime: 9500, lane: 2 }, { hitTime: 10000, lane: 3 },
      { hitTime: 11000, lane: 1 }, { hitTime: 11500, lane: 2 }, { hitTime: 12000, lane: 3 }, { hitTime: 12500, lane: 0 },
      { hitTime: 13500, lane: 2 }, { hitTime: 14000, lane: 3 }, { hitTime: 14500, lane: 0 }, { hitTime: 15000, lane: 1 },
      { hitTime: 16000, lane: 0 }, { hitTime: 16500, lane: 1 }, { hitTime: 17000, lane: 2 }, { hitTime: 17500, lane: 3 },
      { hitTime: 18500, lane: 1 }, { hitTime: 19000, lane: 2 }, { hitTime: 19500, lane: 3 }, { hitTime: 20000, lane: 0 },
      { hitTime: 21000, lane: 2 }, { hitTime: 21500, lane: 3 }, { hitTime: 22000, lane: 0 }, { hitTime: 22500, lane: 1 },
      { hitTime: 24000, lane: 0 }, { hitTime: 24500, lane: 1 }, { hitTime: 25000, lane: 2 }, { hitTime: 25500, lane: 3 },
      { hitTime: 27000, lane: 1 }, { hitTime: 28000, lane: 2 }, { hitTime: 29000, lane: 3 }, { hitTime: 30000, lane: 0 }
    ]
  }
};

const DIFICULDADES = {
  easy: {
    nome: "Fácil",
    travelTime: 2500,      // Tempo que nota leva para chegar (ms)
    hitWindow: 200,        // Janela de acerto (ms)
    reputacaoInicial: 5    // Vidas iniciais
  },
  medium: {
    nome: "Médio",
    travelTime: 2000,
    hitWindow: 175,
    reputacaoInicial: 4
  },
  hard: {
    nome: "Difícil",
    travelTime: 1500,
    hitWindow: 150,
    reputacaoInicial: 3
  }
};

function obterBeatmap(musica, dificuldade) {
  const beatmapMusica = BEATMAPS[musica];
  if (!beatmapMusica) return null;
  
  const notas = beatmapMusica[dificuldade];
  if (!notas) return null;
  
  return {
    nome: beatmapMusica.nome,
    arquivo: beatmapMusica.arquivo,
    bpm: beatmapMusica.bpm,
    duracao: beatmapMusica.duracao,
    notas: notas.map(n => ({ ...n, spawned: false, hit: false })),
    config: DIFICULDADES[dificuldade]
  };
}

// no caso seria só feather i guess
function listarMusicas() {
  return Object.keys(BEATMAPS).map(id => ({
    id,
    nome: BEATMAPS[id].nome,
    duracao: BEATMAPS[id].duracao,
    bpm: BEATMAPS[id].bpm
  }));
}

window.Beatmaps = {
  BEATMAPS,
  DIFICULDADES,
  obterBeatmap,
  listarMusicas
};
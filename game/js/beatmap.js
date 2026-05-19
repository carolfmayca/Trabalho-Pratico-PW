/**
 * Beatmaps das músicas.
 * Cada nota tem: hitTime (ms desde início), lane (0-3 para A/S/D/F)
 */

const BEATMAPS = {
  feather: {
    nome: "Feather",
    arquivo: "assets/audio/Feather.mp3",
    bpm: 128,
    duracao: 180000, // 3 minutos em ms
    
    easy: [
      // exemplo
      { hitTime: 2000, lane: 0 },   // A
      { hitTime: 3000, lane: 1 },   // S
      { hitTime: 4000, lane: 2 },   // D
      { hitTime: 5000, lane: 3 },   // F
      { hitTime: 6500, lane: 1 },   // S
      { hitTime: 8000, lane: 2 },   // D
      ],
    
    medium: [],
    
    hard: []
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
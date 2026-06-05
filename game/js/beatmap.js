const MUSICAS = {
  feather: {
    nome: "Feather",
    arquivo: "assets/audio/Feather.mp3",
    bpm: 128,
    duracao: 72000
  }
};

const NOTAS_POR_DIFICULDADE = {
  easy: { quantidade: 60, intervaloMin: 800 },
  medium: { quantidade: 100, intervaloMin: 500 },
  hard: { quantidade: 150, intervaloMin: 300 }
};

function gerarBeatmap(musica, dificuldade) {
  const infoMusica = MUSICAS[musica];
  if (!infoMusica) return null;

  const config = NOTAS_POR_DIFICULDADE[dificuldade];
  if (!config) return null;

  const { quantidade, intervaloMin } = config;
  const duracao = infoMusica.duracao;
  const inicioNotas = 1000;
  const fimNotas = duracao - 500;

  const notas = [];
  const tempoDisponivel = fimNotas - inicioNotas;
  let ultimoPowerUpTime = -15000; // garante que primeiro pode ser power-up

  for (let i = 0; i < quantidade; i++) {
    const hitTime = inicioNotas + Math.round((tempoDisponivel / quantidade) * i + Math.random() * (intervaloMin * 0.5));
    const lane = Math.floor(Math.random() * 4);
    const tempoDesdeUltimoPowerUp = hitTime - ultimoPowerUpTime;
    const isPowerUp = Math.random() < 0.08 && tempoDesdeUltimoPowerUp >= 15000;

    if (isPowerUp) {
      ultimoPowerUpTime = hitTime;
      notas.push({ hitTime, lane, type: 'powerup' });
    } else {
      notas.push({ hitTime, lane });
    }
  }

  notas.sort((a, b) => a.hitTime - b.hitTime);
  for (let i = 1; i < notas.length; i++) {
    if (notas[i].hitTime - notas[i - 1].hitTime < intervaloMin) {
      notas[i].hitTime = notas[i - 1].hitTime + intervaloMin;
    }
  }

  const notasValidas = notas.filter(n => n.hitTime <= fimNotas);

  return notasValidas;
}

const DIFICULDADES = {
  easy: {
    nome: "Fácil",
    travelTime: 2500,      
    hitWindow: 500,        
    reputacaoInicial: 5    
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
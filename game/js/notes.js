/** @type {Array<{id: number, lane: number, hitTime: number, y: number, element: HTMLElement, hit: boolean, missed: boolean}>} */
let notasAtivas = [];

let proximoIdNota = 0;

// onde as notas serão criadas
let containerNotas = null;

const LANE_POSITIONS = {
  0: 12.5, 
  1: 37.5,
  2: 62.5,  
  3: 87.5
};

const LANE_ARROWS = {
  0: 'left_arrow.png',
  1: 'down_arrow.png',
  2: 'up_arrow.png',
  3: 'right_arrow.png'
};

function inicializarNotas(containerId = 'game-area') {
  containerNotas = document.getElementById(containerId);
  if (!containerNotas) {
    console.error('Container de notas não encontrado:', containerId);
  }

  notasAtivas = [];
  proximoIdNota = 0;
}

function criarNota(dadosNota, travelTime) {
  if (!containerNotas) return null;

  const elemento = document.createElement('img');
  elemento.className = 'note';
  elemento.src = `assets/images/${LANE_ARROWS[dadosNota.lane] || 'down_arrow.png'}`;
  elemento.style.width = '40px';
  elemento.style.height = 'auto';
  elemento.dataset.lane = dadosNota.lane;
  elemento.dataset.id = proximoIdNota;

  const posX = LANE_POSITIONS[dadosNota.lane] || 50;
  elemento.style.left = `${posX}%`;
  elemento.style.top = '0px';
  elemento.style.transform = 'translateX(-50%)';

  if (dadosNota.type === 'powerup') {
    elemento.classList.add('powerup');
  }

  containerNotas.appendChild(elemento);

  const nota = {
    id: proximoIdNota++,
    lane: dadosNota.lane,
    hitTime: dadosNota.hitTime,
    y: 0,
    element: elemento,
    hit: false,
    missed: false,
    travelTime: travelTime,
    type: dadosNota.type
  };

  notasAtivas.push(nota);
  return nota;
}

function atualizarNotas(tempoDecorrido) {
  const linhaAcertoY = window.Colisao?.obterLinhaAcertoY() || 520;

  notasAtivas.forEach(nota => {
    if (nota.hit || nota.missed) return;

    const tempoRestante = nota.hitTime - tempoDecorrido;
    const progresso = 1 - (tempoRestante / nota.travelTime);

    const inicioY = 0;
    const fimY = linhaAcertoY;
    nota.y = inicioY + (fimY - inicioY) * progresso;

    nota.element.style.top = `${nota.y}px`;

    const distancia = Math.abs(nota.y - linhaAcertoY);
    if (distancia < 50 && !nota.element.classList.contains('near-hit')) {
      nota.element.classList.add('near-hit');
    }
  });
}

function verificarNotasPerdidas(tempoDecorrido, hitWindow) {
  const notasPerdidas = [];
  
  notasAtivas.forEach(nota => {
    if (nota.hit || nota.missed) return;
    
    const tempoLimite = nota.hitTime + hitWindow;
    if (tempoDecorrido > tempoLimite) {
      nota.missed = true;
      nota.element.classList.add('missed');
      notasPerdidas.push(nota);
    }
  });
  
  return notasPerdidas;
}

function marcarNotaAcertada(nota, qualidade) {
  if (!nota || nota.hit || nota.missed) return;
  
  nota.hit = true;
  nota.element.classList.add('hit', qualidade);
  
  setTimeout(() => removerNota(nota), 300);
}

function removerNota(nota) {
  if (!nota) return;
  
  if (nota.element && nota.element.parentNode) {
    nota.element.remove();
  }
  
  const index = notasAtivas.indexOf(nota);
  if (index > -1) {
    notasAtivas.splice(index, 1);
  }
}

function limparNotas() {
  notasAtivas.forEach(nota => {
    if (nota.element && nota.element.parentNode) {
      nota.element.remove();
    }
  });
  notasAtivas = [];
  proximoIdNota = 0;
}

function obterNotasAtivas() {
  return notasAtivas;
}

function contarNotasNaoProcessadas() {
  return notasAtivas.filter(n => !n.hit && !n.missed).length;
}

window.Notas = {
  inicializarNotas,
  criarNota,
  atualizarNotas,
  verificarNotasPerdidas,
  marcarNotaAcertada,
  removerNota,
  limparNotas,
  obterNotasAtivas,
  contarNotasNaoProcessadas
};
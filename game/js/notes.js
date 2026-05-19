/**
 * Gerenciamento de notas
 */
/** @type {Array<{id: number, lane: number, hitTime: number, y: number, element: HTMLElement, hit: boolean, missed: boolean}>} */
let notasAtivas = [];

let proximoIdNota = 0;

// onde as notas serão criadas
let containerNotas = null;

// Posição Y da linha de acerto (px)
let linhaAcertoY = 520;

// Mapeamento de lanes para posições X
const LANE_POSITIONS = {
  0: 25,   // A - 25% da largura
  1: 42,   // S - 42% da largura
  2: 58,   // D - 58% da largura
  3: 75    // F - 75% da largura
};

function inicializarNotas(containerId = 'game-area') {
  containerNotas = document.getElementById(containerId);
  if (!containerNotas) {
    console.error('Container de notas não encontrado:', containerId);
  }
  
  // Obtém linha de acerto do módulo Colisao se disponível
  if (window.Colisao && window.Colisao.obterLinhaAcertoY) {
    linhaAcertoY = window.Colisao.obterLinhaAcertoY();
  }
  
  notasAtivas = [];
  proximoIdNota = 0;
}

function criarNota(dadosNota, travelTime) {
  if (!containerNotas) return null;
  
  const elemento = document.createElement('div');
  elemento.className = 'note';
  elemento.dataset.lane = dadosNota.lane;
  elemento.dataset.id = proximoIdNota;
  
  // Posiciona no topo, na lane correta
  const posX = LANE_POSITIONS[dadosNota.lane] || 50;
  elemento.style.left = `${posX}%`;
  elemento.style.top = '0px';
  elemento.style.transform = 'translateX(-50%)';
  
  containerNotas.appendChild(elemento);
  
  const nota = {
    id: proximoIdNota++,
    lane: dadosNota.lane,
    hitTime: dadosNota.hitTime,
    y: 0,
    element: elemento,
    hit: false,
    missed: false,
    travelTime: travelTime
  };
  
  notasAtivas.push(nota);
  return nota;
}

function atualizarNotas(tempoDecorrido) {
  notasAtivas.forEach(nota => {
    if (nota.hit || nota.missed) return;
    
    // Calcula progresso (0 = topo, 1 = linha de acerto)
    const tempoRestante = nota.hitTime - tempoDecorrido;
    const progresso = 1 - (tempoRestante / nota.travelTime);
    
    const inicioY = 0;
    const fimY = linhaAcertoY;
    nota.y = inicioY + (fimY - inicioY) * progresso;
    
    nota.element.style.top = `${nota.y}px`;
    
    // Adiciona classe visual quando próxima da zona de acerto
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
    
    // Se passou do tempo + janela de acerto, foi perdida
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
  
  // Remove após animação
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
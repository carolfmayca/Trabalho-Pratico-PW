/**
 * Persistência com localStorage.*/

const CHAVE_ARMAZENAMENTO = "beat-slay-repeat-highscores-v1";

/**
 * @typedef {{ name: string, score: number, date: string }} EntradaRecorde
 */

/**
 * @returns {EntradaRecorde[]}
 */
function carregarRecordes() {
  try {
    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return [];
    const parsed = JSON.parse(bruto);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * @param {EntradaRecorde[]} entradas
 */
function salvarListaRecordes(entradas) {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(entradas));
}

/**
 * Registra uma partida e mantém as maiores pontuações.
 * @param {string} nome
 * @param {number} pontuacao
 * @param {number} [maximoEntradas=10]
 * @returns {EntradaRecorde[]} ordenada do maior score para o menor
 */
function salvarRecorde(nome, pontuacao, maximoEntradas = 10) {
  const entrada = {
    name: String(nome || "Player").slice(0, 24),
    score: Math.max(0, Math.floor(Number(pontuacao) || 0)),
    date: new Date().toISOString(),
  };
  const lista = carregarRecordes();
  lista.push(entrada);
  lista.sort((a, b) => b.score - a.score);
  const cortada = lista.slice(0, maximoEntradas);
  salvarListaRecordes(cortada);
  return cortada;
}

/**
 * @returns {number}
 */
function obterMelhorPontuacao() {
  const lista = carregarRecordes();
  return lista.length ? lista[0].score : 0;
}

/** Útil só em desenvolvimento / testes. */
function limparRecordes() {
  localStorage.removeItem(CHAVE_ARMAZENAMENTO);
}

window.Armazenamento = {
  CHAVE_ARMAZENAMENTO,
  carregarRecordes,
  salvarListaRecordes,
  salvarRecorde,
  obterMelhorPontuacao,
  limparRecordes,
};

/**
 * Colisão / timing: nota em relação à linha da zona de acerto.
 * Contrato com o time: cada nota tem lane (0..n-1), y (px), opcional consumed.
 */

let linhaAcertoY = 520;
let toleranciaPerfeita = 15;
let toleranciaBoa = 40;

/**
 * @param {{ linhaAcertoY?: number, toleranciaPerfeita?: number, toleranciaBoa?: number }} opcoes
 */
function definirZonaAcerto(opcoes) {
  if (typeof opcoes.linhaAcertoY === "number") linhaAcertoY = opcoes.linhaAcertoY;
  if (typeof opcoes.toleranciaPerfeita === "number")
    toleranciaPerfeita = opcoes.toleranciaPerfeita;
  if (typeof opcoes.toleranciaBoa === "number") toleranciaBoa = opcoes.toleranciaBoa;
}

/**
 * @typedef {"perfect" | "great" | "good" | "ok"} QualidadeAcerto
 *
 * perfect  — acerto preciso
 * great    — muito bom
 * good     — bom
 * ok       — dentro da janela, mas tardio/adiantado
 */

/**
 * @typedef {{ lane: number, y: number, consumed?: boolean }} NotaSimples
 */

/**
 * @param {NotaSimples[]} notas
 * @param {number} indiceFaixa
 * @returns {{ note: NotaSimples, quality: QualidadeAcerto, distancePx: number } | null}
 */
function verificarAcerto(notas, indiceFaixa) {
  const candidatas = (notas || []).filter(
    (n) => n && !n.consumed && n.lane === indiceFaixa
  );
  if (!candidatas.length) return null;

  let melhor = null;
  let melhorDist = Infinity;
  for (const n of candidatas) {
    const d = Math.abs(n.y - linhaAcertoY);
    if (d < melhorDist) {
      melhorDist = d;
      melhor = n;
    }
  }
  if (!melhor || melhorDist > toleranciaBoa) return null;

  const quality = melhorDist <= toleranciaPerfeita ? "perfect" : "good";
  return { note: melhor, quality, distancePx: melhorDist };
}

/**
 * @param {QualidadeAcerto} qualidade
 * @param {number} [multiplicadorCombo=1]
 */
function pontuacaoPorAcerto(qualidade, multiplicadorCombo = 1) {
  const base =
    qualidade === "perfect" ? 300 :
    qualidade === "great"   ? 200 :
    qualidade === "good"    ? 150 :
    qualidade === "ok"      ? 50  : 0;
  return Math.floor(base * Math.max(0, multiplicadorCombo));
}

/**
 * @param {{ hits: number, total: number }} acumulado
 * @param {boolean} foiAcerto
 */
function registrarPrecisao(acumulado, foiAcerto) {
  acumulado.total += 1;
  if (foiAcerto) acumulado.hits += 1;
}

/**
 * @param {{ hits: number, total: number }} acumulado
 * @returns {number} 0..100
 */
function percentualPrecisao(acumulado) {
  if (!acumulado.total) return 100;
  return Math.round((acumulado.hits / acumulado.total) * 100);
}

function obterLinhaAcertoY() {
  return linhaAcertoY;
}

window.Colisao = {
  definirZonaAcerto,
  verificarAcerto,
  pontuacaoPorAcerto,
  registrarPrecisao,
  percentualPrecisao,
  obterLinhaAcertoY,
};

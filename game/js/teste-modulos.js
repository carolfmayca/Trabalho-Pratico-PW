/**
 * Só para desenvolvimento: liga os botões do painel em index.html aos módulos.
 * Remover esta tag script quando main.js/ui.js integrarem o jogo.
 */

(function () {
  const btnRetomar = document.getElementById("btn-retomar-audio");
  const btnAcerto = document.getElementById("btn-som-acerto");
  const btnErro = document.getElementById("btn-som-erro");
  const btnMusica = document.getElementById("btn-musica");
  const btnSalvar = document.getElementById("btn-salvar-recorde");
  const btnMostrar = document.getElementById("btn-mostrar-recordes");
  const btnLimpar = document.getElementById("btn-limpar-recordes");
  const btnPreparar = document.getElementById("btn-preparar-nota-a");
  const btnPrepararCinco = document.getElementById("btn-preparar-cinco-notas-a");

  const notasDemo = [];
  window.Entrada.resetarEstadoJogador();
  window.Entrada.iniciarEntrada(function (lane) {
    window.Som.retomarAudio();
    const hit = window.Colisao.verificarAcerto(notasDemo, lane);
    if (hit) {
      hit.note.consumed = true;
      window.Entrada.registrarAcerto(hit.quality);
      const ej = window.Entrada.estadoJogador;
      const msg =
        ej.combo > 0 &&
        ej.combo % window.Entrada.INTERVALO_SOM_COMBO === 0
          ? `Acerto: ${hit.quality} — combo ${ej.combo} (som «combo») | score: ${ej.score}`
          : `Acerto: ${hit.quality} combo:${ej.combo} score:${ej.score}`;
      console.log(msg);
    } else {
      window.Entrada.registrarErro();
      const temNotaPendente = notasDemo.some((n) => n && !n.consumed);
      if (!temNotaPendente) {
        console.log(
          "Erro: não há nota ativa (ou já foi consumida). Clique de novo em «Simular nota…» antes de pressionar A."
        );
      } else {
        console.log(
          "Erro: tecla/faixa ou timing — verificarAcerto não achou nota nesta lane. Reputação:",
          window.Entrada.estadoJogador.reputation
        );
      }
    }
  });

  btnPreparar.addEventListener("click", function () {
    window.Entrada.resetarEstadoJogador();
    const y = window.Colisao.obterLinhaAcertoY();
    notasDemo.length = 0;
    notasDemo.push({ lane: 0, y: y, consumed: false });
    console.log(
      "Nota demo na lane 0 (tecla A), y =",
      y,
      "— uma nota por simulação; após acertar, simule de novo."
    );
  });

  btnPrepararCinco.addEventListener("click", function () {
    window.Entrada.resetarEstadoJogador();
    const y = window.Colisao.obterLinhaAcertoY();
    notasDemo.length = 0;
    for (let i = 0; i < 5; i++) {
      notasDemo.push({ lane: 0, y: y, consumed: false });
    }
    console.log(
      "5 notas na lane A. Pressione A cinco vezes; no 5º acerto toca combo.wav (marco a cada",
      window.Entrada.INTERVALO_SOM_COMBO,
      "hits)."
    );
  });

  let musicaTocando = false;

  btnRetomar.addEventListener("click", function () {
    window.Som.retomarAudio();
    window.Som.tocarSom("hit", 0.35);
  });
  btnAcerto.addEventListener("click", function () {
    window.Som.retomarAudio();
    window.Som.tocarSom("hit");
  });
  btnErro.addEventListener("click", function () {
    window.Som.retomarAudio();
    window.Som.tocarSom("miss", 0.92);
  });
  btnMusica.addEventListener("click", function () {
    window.Som.retomarAudio();
    if (musicaTocando) {
      window.Som.pausarMusica();
      musicaTocando = false;
      btnMusica.textContent = "Tocar música";
    } else {
      window.Som.tocarMusica();
      musicaTocando = true;
      btnMusica.textContent = "Pausar música";
    }
  });
  btnSalvar.addEventListener("click", function () {
    const lista = window.Armazenamento.salvarRecorde("Teste", 1200);
    console.log("Recordes:", lista);
  });
  btnMostrar.addEventListener("click", function () {
    console.log("Recordes:", window.Armazenamento.carregarRecordes());
    console.log("Melhor:", window.Armazenamento.obterMelhorPontuacao());
  });
  btnLimpar.addEventListener("click", function () {
    window.Armazenamento.limparRecordes();
    console.log("Recordes limpos.");
  });
})();

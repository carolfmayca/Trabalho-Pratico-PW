UI.registrarCallbacks({
  aoIniciar: function(dificuldade) {
    UI.mostrarTela('jogo');
    UI.mostrarCountdown(function() {
      Jogo.iniciarJogo('feather', dificuldade);
    });
  },
  aoPausar: function() {
    Jogo.pausarJogo();
    UI.mostrarTela('pausa');
  },
  aoRetomar: function() {
    UI.mostrarTela('jogo');
    UI.mostrarCountdown(function() {
      Jogo.retomarJogo();
    });
  },
  aoSair: function() {
    Jogo.voltarMenu();
    UI.mostrarTela('menu');
  },
  aoReiniciar: function(dificuldade) {
    UI.mostrarTela('jogo');
    UI.mostrarCountdown(function() {
      Jogo.iniciarJogo('feather', dificuldade);
    });
  },
  aoMenuPrincipal: function() {
    Jogo.voltarMenu();
    UI.mostrarTela('menu');
  },
});
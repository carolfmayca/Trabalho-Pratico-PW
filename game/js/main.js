UI.registrarCallbacks({
  aoIniciar: function(dificuldade) {
    Jogo.iniciarJogo('feather', dificuldade);
    UI.mostrarTela('jogo');
  },
  aoPausar: function() {
    Jogo.pausarJogo();
    UI.mostrarTela('pausa');
  },
  aoRetomar: function() {
    Jogo.retomarJogo();
    UI.mostrarTela('jogo');
  },
  aoSair: function() {
    Jogo.voltarMenu();
    UI.mostrarTela('menu');
  },
  aoReiniciar: function(dificuldade) {
    Jogo.iniciarJogo('feather', dificuldade);
    UI.mostrarTela('jogo');
  },
  aoMenuPrincipal: function() {
    Jogo.voltarMenu();
    UI.mostrarTela('menu');
  },
});
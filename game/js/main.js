UI.registrarCallbacks({
  aoIniciar: function(dificuldade) {
    UI.mostrarTela('jogo');
  },
  aoPausar: function() {
    UI.mostrarTela('pausa');
  },
  aoRetomar: function() {
    UI.mostrarTela('jogo');
  },
  aoSair: function() {
    UI.mostrarTela('menu');
  },
  aoReiniciar: function(dificuldade) {
    UI.mostrarTela('jogo');
  },
  aoMenuPrincipal: function() {
    UI.mostrarTela('menu');
  },
});
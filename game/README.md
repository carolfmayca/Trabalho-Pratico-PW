# 🎵 Beat-Slay-Repeat

Um jogo de ritmo inspirado em **Guitar Hero** onde você deve pressionar as teclas correspondentes no momento exato para acompanhar o ritmo da música e manter o show da diva pop acontecendo!

## Descrição do Jogo

**Beat-Slay-Repeat** é um rhythm game interativo onde o objetivo é sincronizar a entrada do jogador com as notas musicais exibidas na tela. Conforme o jogo avança, a velocidade e frequência das notas aumentam, tornando a experiência progressivamente mais desafiadora.

### Objetivos
- Pressionar as teclas corretas no momento certo
- Manter o combo (sequência de acertos)
- Gerenciar a reputação (vidas do jogo)
- Alcançar a maior pontuação possível
- Acompanhar o ritmo e manter o show vivo

## Gameplay

### Sistema de Notas
- Notas musicais são criadas dinamicamente na tela
- As notas se movem em direção à **zona de acerto** (hit zone)
- O jogador deve interagir com o teclado quando as notas atingem a zona de acerto

### Estados do Jogo
- **Menu Inicial**: Seleção de dificuldade e início do jogo
- **Gameplay**: Durante a execução do jogo
- **Pausa**: Parar e retomar o jogo
- **Game Over**: Exibição da pontuação final e opção de retry

### Sistemas de Progressão
- **Pontuação**: Aumenta com acertos na zona de acerto
- **Combo**: Sequência de acertos consecutivos (multiplicador de pontos)
- **Reputação/Vidas**: Diminui com notas perdidas
- **Dificuldade Progressiva**: Velocidade e frequência das notas aumentam durante o jogo

## Controles

O jogador utiliza o teclado para interagir com as notas. Os controles específicos são mapeados conforme a zona de acerto definida.

## Estrutura do Projeto

```
Beat-Slay-Repeat/
├── index.html           # Página principal
├── style.css            # Estilos e animações
├── README.md            # Este arquivo
│
├── assets/
│   ├── images/          # Imagens e sprites
│   ├── audio/           # Arquivos de música e SFX
│   └── fonts/           # Fontes customizadas
│
└── js/
    ├── main.js          # Inicialização da aplicação
    ├── game.js          # Loop principal e lógica do jogo
    ├── notes.js         # Gerenciamento das notas
    ├── input.js         # Tratamento de entrada de teclado
    ├── collision.js     # Detecção de colisão com zona de acerto
    ├── ui.js            # Interface do usuário (HUD, menus, efeitos)
    ├── audio.js         # Controle de áudio e sons
    └── storage.js       # Persistência de dados (localStorage)
```

## Divisão de Trabalhos

### Carolina — Gameplay/Core
**Responsável pelo "coração" do jogo**

**Responsabilidades:**
- Spawn das notas musicais
- Movimentação das notas na tela
- Cálculo de timing e sincronização
- Dificuldade progressiva
- Loop principal do jogo

**Arquivos:**
- `game.js`
- `notes.js`
- `beatmaps.js`

**Principais Funções:**
- `spawnNote()` - Cria novas notas na tela
- `updateNotes()` - Atualiza posição das notas
- `startGame()` - Inicia o loop do jogo
- `increaseDifficulty()` - Aumenta dificuldade

---

### Luiza — Interface/Visual
**Responsável pela experiência visual**

**Responsabilidades:**
- Layout e estrutura visual
- CSS e estilização
- Animações suaves
- HUD (Heads-Up Display)
- Menu e telas do jogo
- Efeitos visuais

**Arquivos:**
- `index.html`
- `style.css`
- `ui.js`

**Componentes Principais:**
- **Menu Inicial**: Botão start e seleção de dificuldade
- **HUD em Jogo**: Score, combo, reputação, accuracy
- **Tela de Game Over**: Score final e botão retry
- **Efeitos Visuais**: Glow neon, animações de hit, feedback visual

---

### Aline — Input/Sistema/Som
**Responsável pela interação e feedback**

**Responsabilidades:**
- Detecção de entrada do teclado
- Detecção de colisão com zona de acerto
- Cálculo de score e acurácia
- Sistema de vidas (reputação)
- Gerenciamento de combo
- Reprodução de sons e música
- Persistência de dados (high scores)

**Arquivos:**
- `input.js`
- `collision.js`
- `audio.js`
- `storage.js`

**Principais Funções:**
- `checkHit()` - Verifica se nota foi acertada
- `handleKeyPress()` - Processa entrada do teclado
- `playSound()` - Reproduz efeitos sonoros
- `saveHighscore()` - Salva melhor pontuação
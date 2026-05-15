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
game/
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
    ├── beatmaps.js      # Mapas manuais das notas por dificuldade
    └── storage.js       # Persistência de dados (localStorage)
```
## Divisão de Trabalhos

### Carolina — Gameplay/Core
**Responsável pelo "coração" do jogo**

**Responsabilidades:**
- Loop principal do jogo
- Controle dos estados do jogo
- Spawn das notas
- Movimentação das notas
- Criação e remoção dinâmica das notas no DOM
- Controle do tempo decorrido da partida

**Arquivos:**
- `game.js`
- `notes.js`
- `beatmaps.js`

---

### Luiza — Interface/Visual
**Responsável pela experiência visual**

**Responsabilidades:**
- Layout e estrutura visual
- CSS e estilização
- Animações e efeitos visuais
- HUD do jogo
- Menu inicial e seleção de dificuldade
- Tela de pausa
- Tela de game over
- Feedback visual de acerto, erro e combo

**Arquivos:**
- `index.html`
- `style.css`
- `ui.js`

**Componentes Principais:**
- **Menu Inicial**: botão start e seleção de dificuldade
- **HUD em Jogo**: score, combo, reputação e accuracy
- **Tela de Pausa**: opção de continuar ou sair
- **Tela de Game Over**: score final, maior pontuação e botão retry
- **Efeitos Visuais**: glow neon, animações de hit e feedback visual

---
### Aline — Input/Sistema/Som
**Responsável pela interação, timing e feedback**

**Responsabilidades:**
- Criação dos beatmaps manuais
- Sincronização das notas com a música
- Detecção de entrada do teclado
- Verificação do acerto com base no `hitTime`
- Aplicação da margem de erro da dificuldade escolhida
- Cálculo de score e acurácia
- Sistema de vidas/reputação
- Gerenciamento de combo
- Reprodução de música e efeitos sonoros
- Persistência de dados com localStorage

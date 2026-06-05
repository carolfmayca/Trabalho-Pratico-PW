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
- **Como Jogar**: Tela de instruções com controles e objetivos
- **Gameplay**: Durante a execução do jogo
- **Pausa**: Parar e retomar o jogo
- **Game Over**: Exibição da pontuação final e opção de retry

### Sistemas de Progressão
- **Pontuação**: Aumenta com acertos — PERFECT (300pts), GREAT (200pts), GOOD (150pts), OK (50pts)
- **Combo**: Sequência de acertos consecutivos que aplica um multiplicador crescente de pontos
- **Reputação/Vidas**: Diminui a cada nota perdida ou pressionada fora da janela de tempo; recupera +1 vida a cada 20 acertos consecutivos
- **Precisão (Accuracy)**: Percentual de acertos em relação ao total de notas jogadas, exibido no HUD e na tela de Game Over
- **Power-up**: Notas especiais que, ao serem acertadas, ativam um multiplicador de pontos por 10 segundos
- **Dificuldade**: Selecionada no menu (Fácil / Médio / Difícil); cada nível altera a velocidade das notas (`travelTime`), a janela de acerto (`hitWindow`) e a quantidade de notas geradas
- **Countdown de início**: Contagem visual de 3 segundos antes de começar a partida e ao sair da pausa

## Controles

| Tecla | Faixa |
|-------|-------|
| `←`   | Faixa 1 (seta esquerda) |
| `↓`   | Faixa 2 (seta baixo) |
| `↑`   | Faixa 3 (seta cima) |
| `→`   | Faixa 4 (seta direita) |

No menu inicial, o botão **Como Jogar** abre a tela com instruções rápidas de gameplay.

## Instruções para Execução

O jogo roda diretamente no navegador, sem necessidade de instalação ou servidor.

### Opção 1 — Extensão Live Server (VS Code)
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito em `index.html` → **Open with Live Server**.

### Opção 2 — Servidor HTTP local
```bash
# Python 3
python3 -m http.server 8080
# Acesse http://localhost:8080
```

> **Atenção:** abrir o `index.html` diretamente pelo sistema de arquivos (`file://`) pode bloquear o carregamento dos arquivos de áudio no navegador. Prefira sempre usar um servidor local.

## Estrutura do Projeto

```
game/
├── index.html             # Página principal
├── style.css              # Estilos e animações
├── README.md              # Este arquivo
│
├── assets/
│   ├── images/            # Imagens e sprites
│   └── audio/             # Arquivos de música e SFX
│
└── js/
    ├── main.js            # Inicialização e conexão entre módulos
    ├── game.js            # Loop principal e controle de estados
    ├── notes.js           # Criação, movimentação e remoção de notas no DOM
    ├── beatmap.js         # Geração dinâmica de beatmaps por dificuldade
    ├── input.js           # Entrada de teclado, score, combo, reputação e power-up
    ├── collision.js       # Detecção de acerto/miss e cálculo de precisão
    ├── ui.js              # HUD, menus, feedback visual e callbacks de botões
    ├── audio.js           # Música de fundo e efeitos sonoros (SFX)
    └── storage.js         # Persistência do recorde via localStorage
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
- `beatmap.js`

---

### Luiza — Interface/Visual
**Responsável pela experiência visual**

**Responsabilidades:**
- Layout e estrutura visual
- CSS e estilização
- Animações e efeitos visuais
- HUD do jogo
- Menu inicial e seleção de dificuldade
- Tela de como jogar (tutorial)
- Tela de pausa
- Tela de game over
- Feedback visual de acerto, erro e combo
- Countdown visual (3, 2, 1, GO!)

**Arquivos:**
- `index.html`
- `style.css`
- `ui.js`

**Componentes Principais:**
- **Menu Inicial**: botão start e seleção de dificuldade
- **Tela Como Jogar**: instruções de controles e objetivos
- **HUD em Jogo**: score, combo, reputação e accuracy
- **Tela de Pausa**: opção de continuar ou sair
- **Tela de Game Over**: score final, maior pontuação e botão retry
- **Efeitos Visuais**: glow neon, animações de hit, feedback visual e countdown

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

**Arquivos:**
- `beatmap.js`
- `input.js`
- `collision.js`
- `audio.js`
- `storage.js`
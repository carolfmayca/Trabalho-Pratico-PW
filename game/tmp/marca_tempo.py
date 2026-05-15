import pygame
import time

AUDIO_FILE = "assets/audio/Beautiful_Liar.mp3"

pygame.init()
pygame.mixer.init()

# Cria uma janela pequena só para capturar eventos
screen = pygame.display.set_mode((200, 100))
pygame.display.set_caption("Gravador de Teclas")

pygame.mixer.music.load(AUDIO_FILE)
pygame.mixer.music.play()

print("Pressione as setas (← ↑ → ↓) para registrar o tempo. Pressione ESC para sair.")

key_map = {
    pygame.K_LEFT: "LEFT",
    pygame.K_RIGHT: "RIGHT",
    pygame.K_UP: "UP",
    pygame.K_DOWN: "DOWN"
}

events = []

start_time = time.time()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key in key_map:
                t = time.time() - start_time
                print(f"{key_map[event.key]}: {t:.3f}s")
                events.append((key_map[event.key], t))
            elif event.key == pygame.K_ESCAPE:
                running = False
    if not pygame.mixer.music.get_busy():
        running = False

with open("teclas_e_tempos.txt", "w") as f:
    f.write(f"const beatmap {AUDIO_FILE.split('/')[-1].split('.')[0]} = [\n")
    for i, (key, t) in enumerate(events):
        comma = "," if i < len(events) - 1 else ""
        f.write(f'  {{ key: "{key}", hitTime: {int(t * 1000)} }}{comma}\n')
    f.write("];\n")

print("Registro salvo em teclas_e_tempos.txt")
pygame.quit()
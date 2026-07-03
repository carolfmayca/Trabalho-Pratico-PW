import prisma from "../utils/prismaClient.js";
import type { GameSession } from "../generated/prisma/client.js";

export async function saveScore(userId: string, score: number): Promise<GameSession> {
    return prisma.gameSession.create({
        data: { userId, score }
    });
}

export async function getTopScores(limit = 10) {
    // Agrupa por usuário e pega a maior pontuação de cada um
    const topScores = await prisma.gameSession.groupBy({
        by: ['userId'],
        _max: { score: true },
        orderBy: { _max: { score: 'desc' } },
        take: limit
    });

    // Busca os nomes dos usuários
    const userIds = topScores.map(s => s.userId);
    const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, name: true }
    });

    const usersMap = Object.fromEntries(users.map(u => [u.id, u.name]));

    return topScores.map((s, i) => ({
        position: i + 1,
        name: usersMap[s.userId] ?? 'Desconhecido',
        score: s._max.score ?? 0
    }));
}

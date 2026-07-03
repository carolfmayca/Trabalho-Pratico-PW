import type { Prof, Nodes } from './helpersTypes.js';
export function listProfs(profs: Prof[]) {
    const list = profs.map((p) => `<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
export function listNodes(nodes: Nodes[]) {
    const list = nodes
        .filter((node) => node.poweredByNodejs)
        .map((p) => `<li>${p.name} ${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function navActive(currentPath: string, targetPath: string) {
    if (targetPath === '/') {
        return currentPath === '/' || currentPath === '/play' ? 'active' : '';
    }
    return currentPath === targetPath ? 'active' : '';
}
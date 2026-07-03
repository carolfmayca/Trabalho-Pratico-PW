type Professor = {
    name: string;
    subject: string;
}

type Technology = {
    name: string;
    type: string;
    poweredByNodejs: boolean;
}

function listProfessores(profs: Professor[]): string {
    const ul = (
        profs
        .map(prof => `<li>${prof.name} - ${prof.subject}</li>`)
        .join("")
    );
    return `<ul>${ul}</ul>`;
}

function listTechnologies(technologies: Technology[]): string {
    const ul = (
        technologies
        .filter(tech => tech.poweredByNodejs)
        .map(tech => `<li>${tech.name} - ${tech.type}</li>`)
        .join("")
    );
    return `<ul>${ul}</ul>`;
}

export {
    type Professor,
    listProfessores,
    type Technology,
    listTechnologies,
};

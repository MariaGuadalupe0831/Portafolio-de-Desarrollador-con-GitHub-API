const USERNAME = 'MariaGuadalupe0831'; // usuario de github

async function getGitHubData() {
    try {
        // Obtener el Perfil
        const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`);
        const profile = await profileRes.json();
        renderProfile(profile);

        // Obteniene repositorios 
        // sort=updated: por fecha, per_page=10: solo 10, type=owner: solo míos
        const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10&type=owner&direction=desc`);
        const repos = await reposRes.json();
        renderRepos(repos);

        // Obtener lista de seguidores 
        const followersRes = await fetch(`https://api.github.com/users/${USERNAME}/followers?per_page=15`);
        const followers = await followersRes.json();
        renderFollowers(followers);

    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

function renderProfile(data) {
    const header = document.getElementById('profile-card');
    header.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.name}" width="150">
        <h1>${data.name || data.login}</h1>
        <p>${data.bio || 'Desarrollador de Software'}</p>
        <small>${data.location || 'No disponible'}</small>
        
        <div class="profile-stats" style="margin-top: 15px; display: flex; justify-content: center; gap: 20px;">
            <span><strong>${data.followers}</strong> Seguidores</span>
            <span><strong>${data.following}</strong> Siguiendo</span>
            <span><strong>${data.public_repos}</strong> Repositorios</span>
        </div>
    `;
}

function renderRepos(repos) {
    const container = document.getElementById('repos-container');
    container.innerHTML = repos.map(repo => {
        // fecha de actualización
        const fechaActualizacion = new Date(repo.updated_at).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        return `
            <div class="repo-card">
                <h4>${repo.name}</h4>
                <p>${repo.description || 'Sin descripción'}</p>
                <small>Última actualización: ${fechaActualizacion}</small>
                <a href="${repo.html_url}" target="_blank">Ver Repositorio</a>
            </div>
        `;
    }).join('');
}

function renderFollowers(followers) {
    const list = document.getElementById('followers-list');
    list.innerHTML = followers.map(f => `
        <div class="follower-item">
            <img src="${f.avatar_url}" alt="${f.login}">
            <p>${f.login}</p>
        </div>
    `).join('');
}

// Iniciar la carga
getGitHubData();
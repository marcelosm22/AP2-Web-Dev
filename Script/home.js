document.addEventListener('DOMContentLoaded', function() {
    const sessionToken = localStorage.getItem('sessionToken');

    if (sessionToken !== 'loggedIn') {
        
        window.location.href = 'index.html';
    }

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('sessionToken');
        window.location.href = 'index.html';
    });

    const containerAtletas = document.getElementById('todos-atletas');
    const searchInput = document.getElementById('search-input');
    const endpoints = {
        all: 'https://botafogo-atletas.mange.li/2024-1/all',
        masculino: 'https://botafogo-atletas.mange.li/2024-1/masculino',
        feminino: 'https://botafogo-atletas.mange.li/2024-1/feminino'
    };
    let atletasAtuais = [];

    async function fetchAtletas(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Erro!');
            }
            atletasAtuais = await response.json();
            mostrarAtletas(atletasAtuais);
        } catch (error) {
            console.error('Erro:', error);
            containerAtletas.innerHTML = '<h2>Erro!</h2>';
        }
    }

    function mostrarAtletas(atletas) {
        containerAtletas.innerHTML = '';
        atletas.forEach(atleta => {
            const atletaDiv = document.createElement('div');
            atletaDiv.classList.add('atleta');

            const atletaImg = document.createElement('img');
            atletaImg.src = atleta.imagem;
            atletaImg.alt = atleta.nome;

            const atletaName = document.createElement('p');
            atletaName.innerText = atleta.nome;

            const atletaLink = document.createElement('a');
            atletaLink.href = `detalhamento.html?id=${atleta.id}`;
            atletaLink.innerText = 'Ver detalhes';
            atletaLink.classList.add('details-link');

            atletaDiv.appendChild(atletaImg);
            atletaDiv.appendChild(atletaName);
            atletaDiv.appendChild(atletaLink);

            containerAtletas.appendChild(atletaDiv);
        });
    }

    function filterAthletes() {
        const query = searchInput.value.toLowerCase();
        const filteredAthletes = atletasAtuais.filter(athlete => athlete.nome.toLowerCase().includes(query));
        mostrarAtletas(filteredAthletes);
    }

    searchInput.addEventListener('input', filterAthletes);

    
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            const selectedEndpoint = button.getAttribute('data-endpoint');
            fetchAtletas(endpoints[selectedEndpoint]);
        });
    });

    const filterSelect = document.getElementById('filter-select');
    filterSelect.addEventListener('change', function() {
        const selectedEndpoint = filterSelect.value;
        fetchAtletas(endpoints[selectedEndpoint]);
    });
        fetchAtletas(endpoints.all);
});
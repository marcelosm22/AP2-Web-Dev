document.addEventListener('DOMContentLoaded', function() {
    const sessionToken = localStorage.getItem('sessionToken');

    if (sessionToken !== 'loggedIn') {
        
        window.location.href = 'index.html';
    }

    const parametros = new URLSearchParams(window.location.search);
    const idAtleta = parametros.get('id');

    const endpoint = `https://botafogo-atletas.mange.li/2024-1/${idAtleta}`;
    const containerDetalheAtletas = document.getElementById('detalhes-atleta');

    async function fetchDetalheAtletas() {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Erro!');
            }
            const atleta = await response.json();
            displayDetalhesAtletas(atleta);
        } catch (error) {
            console.error('Erro:', error);
            containerDetalheAtletas.innerHTML = '<p>Error!</p>';
        }
    }

    function displayDetalhesAtletas(atleta) {
        containerDetalheAtletas.innerHTML = `
            <div class="atleta-detail">
                <div class="atleta-imagem">
                <img src="${atleta.imagem}" alt="${atleta.nome}">
                </div>
                <div class="atleta-infos">
                    <li><strong>Nome:</strong> ${atleta.nome}</li>
                    <li><strong>Data de Nascimento:</strong> ${atleta.nascimento}</li>
                    <li><strong>Posição:</strong> ${atleta.posicao}</li>
                    <li><strong>Naturalidade:</strong> ${atleta.naturalidade}</li>
                    <li><strong>Altura:</strong> ${atleta.altura}</li>
                    <li><strong>Elenco:</strong> ${atleta.elenco}</li>
                    <li><strong>Detalhes:</strong> ${atleta.detalhes}</li>
                </div>
            </div>
        `;
    }

    document.getElementById('back-to-home-button').addEventListener('click', function() {
        window.location.href = 'home.html';
    });

    fetchDetalheAtletas();
    });
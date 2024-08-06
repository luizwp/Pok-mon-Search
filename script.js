document.getElementById('pokemon-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário

    const input = document.getElementById('pokemon-input').value.toLowerCase();
    const pokemonInfo = document.getElementById('pokemon-info');
    const errorMessage = document.getElementById('error-message');

    // Resetar estado anterior
    pokemonInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        // Fazer a requisição para a API do Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }

        const data = await response.json();

        // Atualizar os resultados na página
        document.getElementById('pokemon-name').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById('pokemon-height').textContent = (data.height / 10).toFixed(1); // altura em metros
        document.getElementById('pokemon-weight').textContent = (data.weight / 10).toFixed(1); // peso em kg
        document.getElementById('pokemon-types').textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');

        // Exibir a imagem do Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = data.name;
        document.getElementById('pokemon-image').innerHTML = ''; // Limpar imagem antiga
        document.getElementById('pokemon-image').appendChild(pokemonImage);

        // Mostrar as informações do Pokémon
        pokemonInfo.classList.remove('hidden');
        document.getElementById('collapse-button').classList.remove('hidden');
        document.getElementById('info-section').classList.add('hidden'); // Garantir que a seção adicional esteja oculta
    } catch (error) {
        // Exibir mensagem de erro
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
});

document.getElementById('toggle-info').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Alternar a visibilidade da seção de informações com animação
    const infoSection = document.getElementById('info-section');
    if (infoSection.classList.contains('hidden')) {
        infoSection.classList.remove('hidden');
        infoSection.classList.add('visible');
        document.querySelector('.arrow-link img').style.transform = 'rotate(180deg)'; // Girar a seta
    } else {
        infoSection.classList.remove('visible');
        infoSection.classList.add('hidden');
        document.querySelector('.arrow-link img').style.transform = 'rotate(0deg)'; // Restaurar a seta
    }
});

document.getElementById('collapse-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão do link

    // Ocultar a caixa de resultados com animação
    const resultado = document.getElementById('pokemon-info');
    resultado.classList.add('hidden');
    document.getElementById('collapse-button').classList.add('hidden');
});

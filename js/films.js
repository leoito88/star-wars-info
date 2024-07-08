const containercard = document.querySelector("#container-card");
const pageDiv = document.querySelector("#page");
const countDiv = document.querySelector("#count");
let currentPage = 1;

const obtenerFilms = async (page) => {
    try {
        const response = await fetch(`https://swapi.dev/api/films/?page=${page}`);
        const data = await response.json();
        createCards(data.results);
        countDiv.textContent = `Películas encontradas: ${data.count}`;
        pageDiv.textContent = `Página ${page}`; // Mostrar la página actual

        // Habilitar o deshabilitar botones según la respuesta de la API
        btnAnterior.disabled = !data.previous;
        btnSiguiente.disabled = !data.next;
    } catch (error) {
        console.error("Error al obtener las Películas", error);
    }
};

obtenerFilms(currentPage);

const createCards = async (films) => {
    containercard.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

    for (let film of films) {
        const { title, episode_id, opening_crawl, director, producer, release_date} = film;

        containercard.innerHTML += `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <br>
                <p><span>Número de Episodio:</span> ${episode_id}</p>
                <p><span>Texto de Apertura:</span> ${opening_crawl}</p>
                <p><span>Director:</span> ${director}</p>
                <p><span>Productores:</span> ${producer}</p>
                <p><span>Fecha de Estreno:</span> ${release_date}</p>
            </div>
        </div>`;
    }
};

function filterData(searchText) {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
        if (searchText == ' ' || searchText == '') {
            card.style.display = 'block';

        }
        if (cardTitle.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById('searchInput').addEventListener('input', () => {
    let searchText = document.getElementById('searchInput').value.trim().toLowerCase();

    filterData(searchText);

});

// Agregar botones de navegación
const btnAnterior = document.querySelector("#btn-anterior");
const btnSiguiente = document.querySelector("#btn-siguiente");

btnAnterior.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        obtenerFilms(currentPage);
    }
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    obtenerFilms(currentPage);
});
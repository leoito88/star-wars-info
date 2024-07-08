const containercard = document.querySelector("#container-card");
const pageDiv = document.querySelector("#page");
const countDiv = document.querySelector("#count");
let currentPage = 1;

const obtenerPlanets = async (page) => {
    try {
        const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
        const data = await response.json();
        createCards(data.results);
        countDiv.textContent = `Planetas encontrados: ${data.count}`;
        pageDiv.textContent = `Página ${page}`; // Mostrar la página actual

        // Habilitar o deshabilitar botones según la respuesta de la API
        btnAnterior.disabled = !data.previous;
        btnSiguiente.disabled = !data.next;
    } catch (error) {
        console.error("Error al obtener los Planetas", error);
    }
};

obtenerPlanets(currentPage);

const createCards = async (planets) => {
    containercard.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

    for (let planet of planets) {
        const { name, rotation_period, orbital_period, diameter, climate, terrain, gravity, population} = planet;

        containercard.innerHTML += `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <br>
                <p><span>Período de rotación:</span> ${rotation_period}</p>
                <p><span>Período Orbital:</span> ${orbital_period}</p>
                <p><span>Diámetro:</span> ${diameter}</p>
                <p><span>Clima:</span> ${climate}</p>
                <p><span>Gravedad:</span> ${gravity}</p>
                <p><span>Terreno:</span> ${terrain}</p>
                <p><span>Población:</span> ${population}</p>
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
        obtenerPlanets(currentPage);
    }
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    obtenerPlanets(currentPage);
});
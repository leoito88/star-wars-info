const containercard = document.querySelector("#container-card");
const pageDiv = document.querySelector("#page");
const countDiv = document.querySelector("#count");
let currentPage = 1;

const obtenerSpecies = async (page) => {
    try {
        const response = await fetch(`https://swapi.dev/api/species/?page=${page}`);
        const data = await response.json();
        createCards(data.results);
        countDiv.textContent = `Especies encontradas: ${data.count}`;
        pageDiv.textContent = `Página ${page}`; // Mostrar la página actual

        // Habilitar o deshabilitar botones según la respuesta de la API
        btnAnterior.disabled = !data.previous;
        btnSiguiente.disabled = !data.next;
    } catch (error) {
        console.error("Error al obtener las Especies", error);
    }
};

obtenerSpecies(currentPage);

const obtenerInformacionPlaneta = async (url) => {
    try {
        const response = await fetch(url);
        const planeta = await response.json();
        return planeta.name;
    } catch (error) {
        console.error("Error al obtener información del planeta", error);
        return "Desconocido";
    }
};

const createCards = async (species) => {
    containercard.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

    for (let specie of species) {
        const { name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, homeworld, language} = specie;

        //Obtiene información del planeta
        const nombrePlaneta = await obtenerInformacionPlaneta(homeworld);

        containercard.innerHTML += `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <br>
                <p><span>Clasificación:</span> ${classification}</p>
                <p><span>Designación:</span> ${designation}</p>
                <p><span>Altura promedio:</span> ${average_height}</p>
                <p><span>Colores de piel:</span> ${skin_colors}</p>
                <p><span>Colores de cabello:</span> ${hair_colors}</p>
                <p><span>Colores de ojos:</span> ${eye_colors}</p>
                <p><span>Esperanza de vida promedio:</span> ${average_lifespan}</p>
                <p><span>Planeta de origen:</span> ${nombrePlaneta}</p>
                <p><span>Idioma:</span> ${language}</p>
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
        obtenerSpecies(currentPage);
    }
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    obtenerSpecies(currentPage);
});
const containercard = document.querySelector("#container-card");
const pageDiv = document.querySelector("#page");
const countDiv = document.querySelector("#count");
let currentPage = 1;

const obtenerNaves = async (page) => {
    try {
        const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
        const data = await response.json();
        createCards(data.results);
        countDiv.textContent = `Naves encontradas: ${data.count}`;
        pageDiv.textContent = `Página ${page}`; // Mostrar la página actual

        // Habilitar o deshabilitar botones según la respuesta de la API
        btnAnterior.disabled = !data.previous;
        btnSiguiente.disabled = !data.next;
    } catch (error) {
        console.error("Error al obtener las naves espaciales", error);
    }
};

obtenerNaves(currentPage);

const createCards = async (naves) => {
    containercard.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

    for (let nave of naves) {
        const { name, model, manufacturer, cost_in_credits, length, crew, max_atmosphering_speed, passengers, cargo_capacity, consumables, starship_class} = nave;

        containercard.innerHTML += `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <br>
                <p><span>Modelo:</span> ${model}</p>
                <p><span>Fabricante:</span> ${manufacturer}</p>
                <p><span>Precio:</span> ${cost_in_credits} créditos</p>
                <p><span>Longitud:</span> ${length} m</p>
                <p><span>Velocidad Máxima en atmósfera:</span> ${max_atmosphering_speed} km/h</p>
                <p><span>Tripulación:</span> ${crew} tripulantes</p>
                <p><span>Pasajeros:</span> ${passengers} pasajeros</p>
                <p><span>Capacidad de carga:</span> ${cargo_capacity} tn/m2</p>
                <p><span>Abastecimiento:</span> ${consumables}</p>
                <p><span>Clase de Nave:</span> ${starship_class}</p>
            </div>
        </div>`;
    }
};

// Agregar botones de navegación
const btnAnterior = document.querySelector("#btn-anterior");
const btnSiguiente = document.querySelector("#btn-siguiente");

btnAnterior.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        obtenerNaves(currentPage);
    }
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    obtenerNaves(currentPage);
});
const containercard = document.querySelector("#container-card");
const pageDiv = document.querySelector("#page");
const countDiv = document.querySelector("#count");
let currentPage = 1;

const obtenerPersonajes = async (page) => {
    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await response.json();
        createCards(data.results);
        countDiv.textContent = `Personajes encontrados: ${data.count}`;
        pageDiv.textContent = `Página ${page}`; // Mostrar la página actual
    
        // Habilitar o deshabilitar botones según la respuesta de la API
        btnAnterior.disabled = !data.previous;
        btnSiguiente.disabled = !data.next;
    } catch (error) {
        console.error("Error al obtener los personajes", error);
    }
};

obtenerPersonajes(currentPage);

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

const createCards = async (personajes) => {
    containercard.innerHTML = ""; // Limpiar el contenedor antes de agregar las tarjetas

    for (let personaje of personajes) {
        const { name, gender, height, mass, hair_color, skin_color, birth_year, homeworld, films, vehicles, starships} = personaje;

        //Obtiene información del planeta
        const nombrePlaneta = await obtenerInformacionPlaneta(homeworld);

        // Obtener los nombres de las naves
        const starshipsNames = await Promise.all(starships.map(async (url) => {
            try {
                const response = await fetch(url);
                const starshipsData = await response.json();
                return starshipsData.name;
            } catch (error) {
                console.error("Error al obtener información de la Nave", error);
                return "Desconocido"; // En caso de error, mostrar "Desconocido"
            }
        }));

        // Obtener los nombres de los vehículos
        const vehicleNames = await Promise.all(vehicles.map(async (url) => {
            try {
                const response = await fetch(url);
                const vehicleData = await response.json();
                return vehicleData.name;
            } catch (error) {
                console.error("Error al obtener información del Vehículo", error);
                return "Desconocido"; // En caso de error, mostrar "Desconocido"
            }
        }));

            // Obtener los nombres de las Películas
            const filmsNames = await Promise.all(films.map(async (url) => {
                try {
                    const response = await fetch(url);
                    const filmsData = await response.json();
                    return filmsData.title;
                } catch (error) {
                    console.error("Error al obtener información de la Película", error);
                    return "Desconocido"; // En caso de error, mostrar "Desconocido"
                }
            }));

        containercard.innerHTML += `<div class="card">
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <br>
                <p><span>Género:</span> ${gender}</p>
                <p><span>Altura:</span> ${height} cm</p>
                <p><span>Peso:</span> ${mass} Kg</p>
                <p><span>Color de pelo:</span> ${hair_color}</p>
                <p><span>Color de piel:</span> ${skin_color}</p>
                <p><span>Año de nacimiento:</span> ${birth_year}</p>
                <p><span>Planeta Natal:</span> ${nombrePlaneta}</p>
                <p><span>Naves usadas:</span> ${starshipsNames.join(", ")}</p>
                <p><span>Vehículos usados:</span> ${vehicleNames.join(", ")}</p>
                <p><span>Películas que apareció:</span> ${filmsNames.join(", ")}</p>
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
        obtenerPersonajes(currentPage);
    }
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    obtenerPersonajes(currentPage);
});

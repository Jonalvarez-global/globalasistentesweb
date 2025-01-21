const baseUrl = window.location.origin;


function crearCard(imagen, nombre, url) {
    const nuevoDiv = document.createElement('div');

    nuevoDiv.className = 'col-12 col-md-4 p-3';
    nuevoDiv.innerHTML = `
        <div class="card h-100" style="border-radius: 10px;">
            <a href="${url}" target="_blank" style="text-decoration: none; color: inherit;">
                <div class="d-flex justify-content-center align-items-center" style="height: 300px; overflow: hidden;">
                    <img src="${imagen}" class="card-img-top" alt="${nombre}" 
                        style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center" style="font-weight: bold; color: #333;">${nombre}</h5>
                </div>
            </a>
        </div>
    `;
    const contenedorBox = document.querySelector('#card-container');
    if (contenedorBox) {
        contenedorBox.appendChild(nuevoDiv);
    }
}

function cargarDatos() {

    fetch(`${baseUrl}/cargar`)
        .then(response => response.json())
        .then(data => {
            const contenedorBox = document.querySelector('#card-container');
            contenedorBox.innerHTML = '';
            data.forEach(item => {
                crearCard(item.imagen, item.nombre, item.url, item.id);
            });
        })
        .catch(error => {
            console.error('Error cargando datos:', error);
            console.log('Error al cargar los datos del archivo JSON');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});




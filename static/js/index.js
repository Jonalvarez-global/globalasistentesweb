const baseUrl = window.location.origin;

let isManagerView = false; // Variable global para controlar la vista actual

function generarFormulario(nombre = '', url = '', imagen = '', id = null) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const formContainer = document.createElement('div');
    formContainer.style.backgroundColor = 'white';
    formContainer.style.padding = '20px';
    formContainer.style.borderRadius = '5px';
    formContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    formContainer.innerHTML = `
    <h2 class="text-center mb-4">Formulario</h2>
    <form id="miFormulario" onsubmit="manejarEnvio(event, ${id})" class="p-4 border rounded shadow">
        <img id="imagenPreview" style="max-width: 300px; max-height: 200px; border-radius: 4px; margin: 10px auto; display: ${imagen ? 'block' : 'none'};" alt="Vista previa de la imagen" src="${imagen}">
        
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre:</label>
            <input type="text" id="nombre" value="${nombre}" required class="form-control">
        </div>
        
        <div class="mb-3">
            <label for="url" class="form-label">URL:</label>
            <input type="url" id="url" value="${url}" required class="form-control">
        </div>
        
        <div class="mb-3">
            <label class="form-label">Imagen (URL o archivo):</label>
            <input type="url" id="imagenUrl" class="form-control" oninput="actualizarVistaPrevia('url')" value="${imagen}">
            <input type="file" id="imagenArchivo" accept="image/*" class="form-control mt-2" onchange="actualizarVistaPrevia('archivo')">
        </div>
        
        <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-success">Enviar</button>
            <button type="button" onclick="cerrarFormulario()" class="btn btn-danger">Cerrar</button>
        </div>
    </form>
    `;

    overlay.appendChild(formContainer);
    document.body.appendChild(overlay);
}

function crearCard(imagen, nombre, url, id) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'carousel-item';
    nuevoDiv.innerHTML = `
         <div id="${id}" class="card">
            <div class="card-actions">
                <span class="action-icon" onclick="abrirFormularioActualizar(${id})">
                    <i class="fas fa-edit"></i>
                </span>
                <span class="action-icon" onclick="crearSeguro('${nombre}', ${id})">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
            <a href="${url}" target="_blank" style="text-decoration: none;">
                <div class="d-flex justify-content-center align-items-center p-4" style="height: 200px;">
                    <img src="${imagen}" class="card-img-top" alt="${nombre}" 
                        style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${nombre}</h5>
                </div>
            </a>
        </div>
    `;
    const contenedorBox = document.querySelector('#card-container');
    if (contenedorBox) {
        contenedorBox.appendChild(nuevoDiv);
    }
}

function crearCardView(imagen, nombre, url) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.className = 'carousel-item';
    nuevoDiv.innerHTML = `
         <div class="card">
            <a href="${url}" target="_blank" style="text-decoration: none;">
                <div class="d-flex justify-content-center align-items-center p-4" style="height: 200px;">
                    <img src="${imagen}" class="card-img-top" alt="${nombre}" 
                        style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div class="card-body text-center">
                    <h5 class="card-title">${nombre}</h5>
                </div>
            </a>
        </div>
    `;
    const contenedorBox = document.querySelector('#card-container');
    if (contenedorBox) {
        contenedorBox.appendChild(nuevoDiv);
    }
}


function crearSeguro(nombre, id) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const confirmContainer = document.createElement('div');
    confirmContainer.style.backgroundColor = 'white';
    confirmContainer.style.padding = '20px';
    confirmContainer.style.borderRadius = '5px';
    confirmContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    confirmContainer.innerHTML = `
        <h2>Confirmar Eliminación</h2>
        <p>¿Estás seguro de eliminar "${nombre}"?</p>
        <div class="d-flex justify-content-between">
            <button type="button" onclick="eliminar(${id}, '${nombre}')" class="btn btn-danger">Eliminar</button>
            <button type="button" onclick="cerrarFormulario()" class="btn btn-secondary">Cancelar</button>
        </div>
    `;

    overlay.appendChild(confirmContainer);
    document.body.appendChild(overlay);
}

function actualizarVistaPrevia(tipo) {
    const imagenPreview = document.getElementById('imagenPreview');

    if (tipo === 'url') {
        const imagenUrl = document.getElementById('imagenUrl').value;
        if (imagenUrl) {
            imagenPreview.src = imagenUrl;
            imagenPreview.style.display = 'block';
            document.getElementById('imagenArchivo').value = '';
        }
    } else {
        const archivo = document.getElementById('imagenArchivo').files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagenPreview.src = e.target.result;
                imagenPreview.style.display = 'block';
            };
            reader.readAsDataURL(archivo);
            document.getElementById('imagenUrl').value = '';
        }
    }
}

function manejarEnvio(event, id = null) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const url = document.getElementById('url').value;
    const imagenUrl = document.getElementById('imagenUrl').value;
    const imagenArchivo = document.getElementById('imagenArchivo').files[0];

    if (!imagenUrl && !imagenArchivo) {
        //alert('Por favor, proporciona una URL de imagen o selecciona un archivo.');
        return;
    }

    let imagen = '';

    if (imagenUrl) {
        imagen = imagenUrl;
    } else if (imagenArchivo) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagen = e.target.result;
            if (id) {
                actualizarDatos(id, nombre, url, imagen);
            } else {
                guardarDatos(nombre, url, imagen);
            }
        };
        reader.readAsDataURL(imagenArchivo);
        return;
    }

    if (id) {
        actualizarDatos(id, nombre, url, imagen);
    } else {
        guardarDatos(nombre, url, imagen);
    }
}

function guardarDatos(nombre, url, imagen) {
    const data = { nombre, url, imagen };

    fetch(`${baseUrl}/guardar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cerrarFormulario();
                reinicializarCarrusel();
            } else {
                alert('Error al guardar los datos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al guardar los datos');
        });
}

function abrirFormularioActualizar(id) {
    // Obtener los datos de la tarjeta a actualizar
    fetch(`${baseUrl}/cargar/${id}`)
        .then(response => response.json())
        .then(data => {
            // Llamar a generarFormulario con los datos de la tarjeta
            generarFormulario(data.nombre, data.url, data.imagen, id);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

function actualizarDatos(id, nombre, url, imagen) {
    const data = { nombre, url, imagen };

    fetch(`${baseUrl}/actualizar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                //alert('Datos actualizados correctamente');
                cerrarFormulario();
                reinicializarCarrusel();
            } else {
                alert('Error al actualizar los datos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al actualizar los datos');
        });
}

function cargarDatos() {
    fetch(`${baseUrl}/cargar`)
        .then(response => response.json())
        .then(data => {
            const contenedorBox = document.querySelector('#card-container');
            contenedorBox.innerHTML = '';
            contenedorBox.classList.remove('grid-view');

            // Cargar las cards según la vista actual
            data.forEach(item => {
                if (isManagerView) {
                    crearCard(item.imagen, item.nombre, item.url, item.id);
                } else {
                    crearCardView(item.imagen, item.nombre, item.url);
                }
            });

            // Añadir la card con el símbolo "+" solo en la vista de Manager
            if (isManagerView) {
                const addCard = document.createElement('div');
                addCard.className = 'carousel-item';
                addCard.innerHTML = `
                    <div class="card add-card" onclick="generarFormulario()">
                        <i class="fas fa-plus"></i>
                    </div>
                `;
                contenedorBox.appendChild(addCard);
            }

            // Mostrar botones de navegación en ambas vistas
            document.querySelector('.custom-prev-button').style.display = 'block';
            document.querySelector('.custom-next-button').style.display = 'block';

            // Inicializar el carrusel siempre
            $('#card-container').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
                arrows: true,
                autoplay: false,
                prevArrow: $('.custom-prev-button'),
                nextArrow: $('.custom-next-button'),
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        })
        .catch(error => {
            console.error('Error cargando datos:', error);
            console.log('Error al cargar los datos del archivo JSON');
        });
}

function reinicializarCarrusel() {
    if ($('#card-container').hasClass('slick-initialized')) {
        $('#card-container').slick('unslick');
    }
    const contenedorBox = document.querySelector('#card-container');
    contenedorBox.classList.remove('grid-view');
    cargarDatos();
}

function eliminar(id) {
    fetch(`${baseUrl}/eliminar/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Eliminado correctamente');
                cerrarFormulario();
                reinicializarCarrusel();
            } else {
                console.error('Error al eliminar:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error al eliminar:', error);
        });
}

function cerrarFormulario() {
    const overlay = document.querySelector('div[style*="position: fixed"]');

    if (overlay) {
        overlay.remove();
    }
}

// Añadir los event listeners para los botones
document.addEventListener('DOMContentLoaded', () => {
    const liveViewBtn = document.querySelector('.menu_item_custom:nth-child(2) a');
    const managerBtn = document.querySelector('.menu_item_custom:nth-child(3) a');

    liveViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isManagerView = false;
        reinicializarCarrusel();
    });

    managerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isManagerView = true;
        reinicializarCarrusel();
    });

    cargarDatos()
});




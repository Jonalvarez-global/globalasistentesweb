const baseUrl = window.location.origin;


function crearCard(imagen, nombre, url) {
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

function cargarDatos() {
    fetch(`${baseUrl}/cargar`)
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data);
            const contenedorBox = document.querySelector('#card-container');
            if (!contenedorBox) {
                console.error('No se encontró el elemento #card-container');
                return;
            }
            contenedorBox.innerHTML = '';
            contenedorBox.classList.remove('grid-view');

            // Cargar las cards según la vista actual
            data.forEach(item => {
                crearCard(item.imagen, item.nombre, item.url);
            });

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
            console.error('Error detallado:', error);
        });
}



document.addEventListener('DOMContentLoaded', () => {
    cargarDatos()
});



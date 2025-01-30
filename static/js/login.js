async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username, password);

    try {
        const response = await fetch('http://tu-api.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Inicio de sesión exitoso:', data);
            localStorage.setItem('token', data.token);
            window.location.href = '/asistenteView';
        } else {
            console.error('Error en el inicio de sesión:', data.message);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error en la conexión con el servidor');
    }


}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
});
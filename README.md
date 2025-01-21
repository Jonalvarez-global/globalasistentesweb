# Documentación de la API

Esta es una API construida con Flask que permite gestionar datos de tarjetas. A continuación se describen las rutas principales de la aplicación.

## Rutas

### 1. Guardar un nuevo dato
- **Ruta:** `/guardar`
- **Método:** `POST`
- **Descripción:** Guarda un nuevo dato en el archivo `cards.json`.
- **Cuerpo de la solicitud:** Debe contener un objeto JSON con los datos a guardar.

### 2. Cargar todos los datos
- **Ruta:** `/cargar`
- **Método:** `GET`
- **Descripción:** Carga todos los datos almacenados en `cards.json`.
- **Respuesta:** Devuelve un array de objetos JSON.

### 3. Eliminar un dato
- **Ruta:** `/eliminar/<int:id>`
- **Método:** `DELETE`
- **Descripción:** Elimina el dato con el ID especificado.
- **Respuesta:** Devuelve un objeto JSON indicando el éxito o el error.

### 4. Actualizar un dato
- **Ruta:** `/actualizar/<int:id>`
- **Método:** `PUT`
- **Descripción:** Actualiza el dato con el ID especificado.
- **Cuerpo de la solicitud:** Debe contener un objeto JSON con los datos a actualizar.

### 5. Cargar un dato específico
- **Ruta:** `/cargar/<int:id>`
- **Método:** `GET`
- **Descripción:** Carga el dato con el ID especificado.
- **Respuesta:** Devuelve el objeto JSON correspondiente o un error si no se encuentra.

### 6. Página principal
- **Ruta:** `/asistentes`
- **Método:** `GET`
- **Descripción:** Renderiza la plantilla `index.html`.

### 7. Vista del asistente
- **Ruta:** `/asistenteView`
- **Método:** `GET`
- **Descripción:** Renderiza la plantilla `asistenteView.html`.

## Notas
- La aplicación se ejecuta en modo de depuración (`debug=True`), lo que facilita el desarrollo y la depuración.

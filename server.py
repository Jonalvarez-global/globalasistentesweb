from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Permitir peticiones CORS

#ruta_archivo = './data/cards.json'
ruta_archivo = os.getenv('ruta_archivo')

# Definir la única palabra válida
palabra_valida = os.getenv('palabra')

def verificar_palabra(func):
    def wrapper(*args, **kwargs):
        palabra = request.args.get('palabra')  # Obtener la palabra de los parámetros de la consulta
        if palabra == palabra_valida:  # Comparar con la única palabra válida
            return func(*args, **kwargs)  # Llamar a la función original si la palabra es válida
        else:
            return redirect(url_for('indexView'))  # Redirigir a asistenteView si la palabra no es válida
    wrapper.__name__ = func.__name__  # Para mantener el nombre original de la función
    return wrapper

@app.route('/guardar', methods=['POST'])
def guardar():
    try:
        nuevo_dato = request.json
        # LEER
        if os.path.exists(ruta_archivo):
            with open(ruta_archivo, 'r') as f:
                datos = json.load(f)
        else:
            # CREAR ARCHIVO EN CASO DE NO EXISTIR
            with open(ruta_archivo, 'w') as f:
                json.dump([], f)
            datos = []
        
        # AÑADIR ID único
        if datos:  # Verifica si hay datos existentes
            nuevo_dato['id'] = max(dato['id'] for dato in datos) + 1  # Asigna el siguiente ID
        else:
            nuevo_dato['id'] = 1  # Si no hay datos, el primer ID es 1
        
        # AÑADIR
        datos.append(nuevo_dato)
        
        # GUARDAR
        with open(ruta_archivo, 'w') as f:
            json.dump(datos, f, indent=2)
        
        return jsonify({"success": True})
    
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/cargar', methods=['GET'])
def cargar():
    try:
        if os.path.exists(ruta_archivo):
            with open(ruta_archivo, 'r') as f:
                datos = json.load(f)
            return jsonify(datos)
        else:
            return jsonify([])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminar(id):
    try:
        if os.path.exists(ruta_archivo):
            with open(ruta_archivo, 'r') as f:
                datos = json.load(f)

            datos = [dato for dato in datos if dato.get('id') != id]

            with open(ruta_archivo, 'w') as f:
                json.dump(datos, f, indent=2)
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Archivo no encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/actualizar/<int:id>', methods=['PUT'])
def actualizar(id):
    try:
        nuevo_dato = request.json
        if os.path.exists(ruta_archivo):
            with open(ruta_archivo, 'r') as f:
                datos = json.load(f)

            for dato in datos:
                if dato['id'] == id:
                    dato.update(nuevo_dato)
                    break

            with open(ruta_archivo, 'w') as f:
                json.dump(datos, f, indent=2)
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Archivo no encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route('/cargar/<int:id>', methods=['GET'])
def cargar_dato(id):
    if os.path.exists(ruta_archivo):
        with open(ruta_archivo, 'r') as f:
            datos = json.load(f)

        for dato in datos:
            if dato['id'] == id:
                return jsonify(dato)
    return jsonify({"success": False, "error": "Dato no encontrado"}), 404


@app.route('/asistentes')
@verificar_palabra
def index():
    return render_template('index.html')


@app.route('/asistenteView')
def indexView():
    return render_template('asistenteView.html')


@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/verificar/<string:palabra>', methods=['GET'])
def verificar(palabra):


    if palabra in palabras_validas:
        # return render_template('index.html')
        return redirect(url_for('index'))
    else:
        # return render_template('asistenteView.html')
        return redirect(url_for('indexView')) 

if __name__ == '__main__':
    app.run(debug=True) 
from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

# Главная страница
@app.route('/')
def index():
    return render_template('index.html')

# Страница определения определителя
@app.route('/determinant')
def determinant_page():
    return render_template('determinant.html')

# Страница уравнения плоскости
@app.route('/plane')
def plane_page():
    return render_template('plane.html')

# API для вычисления определителя
@app.route('/api/determinant', methods=['POST'])
def determinant():
    data = request.json
    matrix = np.array(data['matrix'])
    try:
        det = np.linalg.det(matrix)
        return jsonify({'determinant': round(det, 4)})
    except Exception as e:
        return jsonify({'error': str(e)})

# API для нахождения уравнения плоскости
@app.route('/api/plane-equation', methods=['POST'])
def plane_equation():
    data = request.json
    points = np.array(data['points'])
    try:
        v1 = points[1] - points[0]
        v2 = points[2] - points[0]
        normal = np.cross(v1, v2)
        d = -np.dot(normal, points[0])
        equation_terms = [f"{coef:+g}{var}" for coef, var in zip(normal, ["x", "y", "z"]) if coef != 0]
        equation = " ".join(equation_terms) + f" {d:+g} = 0"
        return jsonify({'equation': equation})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

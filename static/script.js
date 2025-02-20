function generateMatrix() {
    const size = document.getElementById('size').value;
    const container = document.getElementById('matrix-container');
    container.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            row.appendChild(input);
        }
        container.appendChild(row);
    }
}

function calculateDeterminant() {
    const matrix = [];
    document.querySelectorAll('#matrix-container div').forEach(row => {
        const values = [...row.querySelectorAll('input')].map(input => Number(input.value));
        matrix.push(values);
    });

    fetch('/api/determinant', {
        method: 'POST',
        body: JSON.stringify({ matrix }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = data.determinant ? `Определитель: ${data.determinant}` : `Ошибка: ${data.error}`;
    });
}

function calculatePlaneEquation() {
    const points = [];
    document.querySelectorAll('#points-container div').forEach(row => {
        const values = [...row.querySelectorAll('input')].map(input => Number(input.value));
        points.push(values);
    });

    fetch('/api/plane-equation', {
        method: 'POST',
        body: JSON.stringify({ points }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('equation-result').innerText = data.equation ? `Уравнение: ${data.equation.replace(/\+/g, ' + ').replace(/-/g, ' - ')}` : `Ошибка: ${data.error}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('points-container');
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < 3; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            row.appendChild(input);
        }
        container.appendChild(row);
    }
});


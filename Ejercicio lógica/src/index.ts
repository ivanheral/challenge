let road = "CCC.G...R..."; // Carretera
let semaforos = road.replace(/C/g, '.'); // cadena con los semaforos exclusivamente
let states = Array(road.length).fill(1); // cadena con el estado de los semaforos
let result = []; // Resultado
const replace = (str: String, pos: number, char: String) => `${str.substring(0, pos)}${char}${str.substring(pos + 1)}`; // Función para reemplazar caracter en una cadena

function moveCar(index: number) {
    if (!/(R|O)/.test(semaforos[index + 1]) && // Si no hay semaforo en rojo o amarillo
        (road[index + 1] === "." || /G/.test(semaforos[index + 1]) && road[index + 2] !== "C")) { // Si hay un carro a la derecha y el semaforo verde
        road = replace(road, index + 1, 'C'); // Movemos el coche
        road = replace(road, index, semaforos[index]); // Modificamos la posición anterior del carro
    }
    if (!road[index + 1]) road = replace(road, index, semaforos[index]); // Si no hay carretera, eliminamos el coche de la carretera
}

function updateLights(index: number, state: String) {
    semaforos = replace(semaforos, index, state); // Cambiamos el estado del semaforo
    if (/(G|O|R)/.test(road[index])) road = replace(road, index, state); // Recuperamos el semaforo para pintarlo en la carretera
    states[index] = 1; // Reiniciamos el estado del semaforo
}

for (let index = 0; index <= 16; index++) { // Recorremos 16 unidades
    result.push(road);
    for (var i = road.length - 1; i >= 0; i--) { // Recorremos la carretera
        if (/(G|O|R)/.test(semaforos[i])) { // Buscamos los semaforos
            states[i] += 1; // Aumentamos el estado del semaforo
            let unitTime = /(G|R)/.test(semaforos[i]) ? 6 : 1; // Calculamos el tiempo de espera segun el estado del semaforo
            if (states[i] % unitTime === 0) // El semaforo se ha pasado de estado, toca cambiarlo
                updateLights(i, semaforos[i] === 'G' ? 'O' : (semaforos[i] === 'O' ? 'R' : 'G')); // Cambiamos el estado del semaforo
        }
        road[i] == "C" && moveCar(i); // Si la posicion es una carro, movemos el carro
    }
}
console.log(result);
const { alfabeto } = require('./base');

// [abc] -> Conjunto [^] -> Negação
// console.log(alfabeto.match(/[^abc123]/gi));
// [0-9]
console.log(alfabeto.match(/[0-9]+/g));
console.log(alfabeto.match(/[a-k]+/g));
console.log(alfabeto.match(/[^a-zA-Z0-9]+/g)); // Negação
console.log(alfabeto.match(/[\w]+/g)); // igual a [0-9] ou [a-z]
console.log(alfabeto.match(/[\W]/g)); // Negação
console.log(alfabeto.match(/\d+/g)); // encontrar digitos em contuntos(+)
console.log(alfabeto.match(/\D+/g)); // Negação
console.log(alfabeto.match(/\s+/g)); // Encontrar todos os espaços
console.log(alfabeto.match(/\S+/g)); // Negação
//* (opicionais) 0 ou n {o,}
// + (obrigatório) 1 ou n {1,}
// ? (opicionais) 0 ou 1 {0,1}
// \ Carctere de escape
// {n,m} mínimo e máximo
// {10,} no mínimo 10
// {,10} de 0 a 10
// {5,10} de 5 a 10

const { texto, arquivos } = require('./base');
const regExp1 = /Jo+ão/gi;
const regExp2 = /\.jp(e)?g/g;

console.log(texto.match(regExp1));

for (const arqivo of arquivos) {
    const valido = arqivo.match(regExp2);

    console.log(arqivo, valido)
}
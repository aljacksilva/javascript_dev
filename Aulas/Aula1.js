/* 
Não podemos criar variáveis com palavras reservedas
Variáveis precisam ter nomes significativos 
Não pode começar o nome de uma variável com números
Nao podem conter espaços ou traços 
utilizamos camelCase
Case-sensitive(variáveis tem diferença com letras maipusculas no JS)
não podemos redeclarar variáveis do tipo let
NÃO ULTILIZE VAR, ULTILIZE LET
As mesmas regras valem para const, não podemos modificar o valor de uma constante e nem reatribuir, constante não pode ser undefined
*/

/*
Tipos de dados primitivos: string, number, undefined, null
boolean, symbol
Variáveis com valor null não aponta pra local nenhum na memória 
*/

// Factory function (Funções fábricas)
/*
function criPessoa(nome, sobrenome, a, p){
    return {
        nome, 
        sobrenome,
        // GETTER
        get nomeCompleto(){
            return `${this.nome} ${this.sobrenome}`;
        },
        // SETTER
        set nomeCompleto(valor) {
            valor = valor.split(' ');
            this.nome = valor.shift();
            this.sobrenome = valor.join(' ');
        },
        fala(assunto = 'Falando sobre This.'){
            return `${this.nome} está ${assunto}.`;
        },
        altura: a,
        peso: p,
        //GETTER serve para obter o valor transformando um método em atributo
        get imc(){
            const indice= this.peso / (this.altura ** 2);
            return indice.toFixed(2);
        }
    };
}

const p1 = criPessoa('Jackson', 'Almeida', 1.75, 76);
p1.nomeCompleto = 'Jackson Silva de Almeida';
console.log(p1.nome);
console.log(p1.sobrenome);
console.log(p1.fala());

// Constructor function (Funções contrutora)

function Pessoa(nome, sobrenome) {
    // Atributos ou métodos privados
    // const ID = 12345;
    // const metodoInterno = function(){};
    
    // Atributos ou métodos públicos por conta do this
    this.nome = nome;
    this.sobrenome =  sobrenome;

}

const p2 = new Pessoa('João');
console.log(p2 + ': sou um método.');

//função recursiva
function recursiva(max) {
    if (max >= 10) return;
    max++;
    console.log(max);
    recursiva(max);
}

recursiva(0);

//funções geradoras
function* geradora1(){
    //código qualquer ...
    yield 'valor 1';
    //código qualquer ...
    yield 'valor 2';
    //código qualquer ...
    yield 'valor 3';
}

function* geradora2(){
    let i = 0;
    while(true){
        yield i;
        i++;
    }
}

function* geradora3(){
    yield 0;
    yield 1;
    yield 2;
}

function* geradora4() {
    yield* geradora3();
    yield 3;
    yield 4;
    yield 5;
}

const g4 =  geradora4();
for(let valor of g4){
    console.log(valor);
}*/

//filter

const numeros = [5, 50, 80, 1 , 2, 3, 5, 8, 7, 11, 22, 27];
const numerosFiltrados = numeros.filter( valor => valor >10);

console.log(numerosFiltrados); 

numeros.forEach(function(valor, indice, array){
    console.log(array[indice])
});

const pessoas = [
    {nome: 'Luiz', idade: 62},
    {nome: 'Maria', idade: 23},
    {nome: 'João', idade: 50},
    {nome: 'Eduardo', idade: 55},
    {nome: 'Letícia', idade: 19},
    {nome: 'Rosana', idade: 32},
    {nome: 'Wallace', idade: 47},
];

const pessoaasComNomesGrande = pessoas.filter(obj => obj.nome.length >= 7);
const pessoasAcimaDe50 = pessoas.filter(num => num.idade > 50);
const nomesQueTerminaComA = pessoas.filter(obj => obj.nome.toLocaleLowerCase().endsWith('a') );

console.log(pessoaasComNomesGrande);
console.log(pessoasAcimaDe50);
console.log(nomesQueTerminaComA);

//map

const numerosEmDobro = numeros.map(valor => valor * 2);
const nomes = pessoas.map(obj => obj.nome);
//retornando a idade em forma de objs
const idades = pessoas.map(obj => ({idade: obj.idade}));
const comIds = pessoas.map(function(obj, indice){
    const newObj = {...obj};
    newObj.id = indice;
    return newObj;
})

console.log(numerosEmDobro);
console.log(nomes);
console.log(idades);
console.log(comIds);

//reduce
const total = numeros.reduce(function(acumulador, valor, indice, array){
    if(valor % 2 === 0) acumulador.push(valor);
    
    return acumulador;
}, []);
const maisVelha = pessoas.reduce(function(acumulador, valor){
    if(acumulador.idade > valor.idade) return acumulador;
    return valor;
});

console.log(total);
console.log(maisVelha);

// Unindo filter, reduce e map
const resultadoDosNumeros = numeros
.filter(valor => valor % 2 ===0)
.map(valor => valor * 2)
.reduce((ac, valor) => ac + valor);

console.log(resultadoDosNumeros);
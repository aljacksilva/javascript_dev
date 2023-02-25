//Promises
function rand(min, max){
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min) + min);
}


function esperaAi(msg, tempo){
    return new Promise((resolve, reject) => {//resolve- resolve a promessa e reject, rejeita.
        setTimeout(() => {
            if(typeof msg !== 'string') {
                reject('BAD VALUE'); return;
            }

            resolve(msg.toUpperCase() + ' - Passei na promisse');
            return
        }, tempo);
        
       
    });
}

esperaAi('Conexão com a BD 1', rand(1, 3))
.then(resposta => {
    console.log(resposta);
    return esperaAi('Buscando dados da BASE', rand(1, 3));
}).then(resposta => {
    console.log(resposta);
    return esperaAi(2222, rand(1, 3));  
}).then(resposta => {
    console.log(resposta); 
}).then(() => {
    console.log('Exibe dados na tela') 
})//será execultando quando o resolve for execultado
.catch(e => {
    console.log('ERRO', e);
});//será execultando quando o reject for execultado

//Promisse.all 
const promises = [
    'Primeiro valor',
    esperaAi('Promise 1', 3000),
    esperaAi('Promise 2', 500),
    esperaAi('Promise 3', 1000),
    'Outro valor'
];

Promise.all(promises)
.then(function(valor){
    console.log(valor);
})
.catch(function(erro){
    console.log(erro);
})

function baixaPagina() {
    const emCache = true;

    if(emCache) {
        return Promise.resolve('Página em cache');
    } else {
        return esperaAi('Baixei a página',3000);
    }
}

baixaPagina()
.then(dadosPagina => {
    console.log(dadosPagina);
})
.catch(e => console.logo('ERRO',e));

async function execulta(){
    const fase4 = await esperaAi('Fase 4', rand());// o await serve para seguir de maneira síncrona
    console.log(fase4);
}
const pessoa1 = new Object();
pessoa1.nome = 'Jackson';
pessoa1.idade = 29;
pessoa1.falaNome = function(){
    return console.log(`${this.nome} está falando o seu nome.`)
};
pessoa1.dataNascimento = function(){
    const data = new Date();
    return data.getFullYear() - this.idade;
};

console.log(pessoa1.falaNome(), pessoa1.dataNascimento());

// for (let chave in pessoa1){
//     console.log(chave);
// }

// Factory funcions
function ciraPessoa(nome, sobrenome){
    return {
        nome,
        sobrenome,
        nomeCompleto() {
            return `${this.nome} ${this.sobrenome}`
        }
        
    };
};

const p1 = ciraPessoa('Jackson', 'Almeida');
console.log(p1.nomeCompleto());

function criaProduto(nome) {
    return {
        get nome(){
            return nome;
        },
        set nome(valor) {
            valor = valor.replace('gins', '');
            nome = valor;
        }
    }   
}

const produto2 = criaProduto('Bermuda');
produto2.nome = 'Calça gins';
console.log(produto2.nome);

// Constructor function
function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.nomeCompleto = () => 'ORIGINIAL: ' + this.nome + ' ' + this.sobrenome;
}

const p2 = new Pessoa('João', 'Dantas');
p2.nome = 'Outra nome';// não mundou a constante, apenas o endereço de que a const p2 recebeu

console.log(p2);

//Prototype

Pessoa.prototype.nomeCompleto = function() {
    return this.nome + ' ' + this.sobrenome;
};
 
function Produto(nome, preco, estoque){
    this.nome = nome;
    this.preco = preco;

    let estoquePrivado = estoque;

    Object.defineProperty(this, 'estoque', {
        enumerable: true, //mostra a chave ou object.keys, caso false não mostra
        /*value: estoque, //valor
        writable: false, //não permite a alteração, caso true permite*/
        configurable: true, // não pode reconfigurar a chave, caso true pode
        get: function(){ //getter, modfica o valor
            return estoquePrivado;
        },
        set: function(valor){//vai setar o valor, configurar
            if (typeof valor !== 'number'){
                throw new TypeError('Só pode ser número');
            }
            estoquePrivado = valor;
        }
    });

}

const produto1 = new Produto('Camiseta', 20, 3);
produto1.estoque = 100;
console.log(produto1.estoque);
console.log(Object.keys(produto1));// acessa as chaves do objeto

const produto = {nome: 'Produto', preco: 1.8};
const caneca = Object.assign({}, produto, {material: 'porcelana'});
Object.freeze(produto);// não permite alterar
produto.nome = 'Outra coisa';

caneca.nome = 'Outro nome';
caneca.preco = 2.5;
console.log(produto);
console.log(caneca);
console.log(Object.getOwnPropertyDescriptor(produto, 'nome'));
console.log(Object.values(produto));
console.log(Object.entries(produto));

for(let [chave, valor] of Object.entries(produto)){
    console.log(chave, valor);// distructering
}

Produto.prototype.desconto = function(percentual){
    this.preco = this.preco - (this.preco * (percentual / 100));
};

Produto.prototype.aumento = function(percentual){
    this.preco = this.preco + (this.preco * (percentual / 100));
};

const prod1 = new Produto('Camiseta', 50);
prod1.desconto(100);

console.log(prod1);

const prod2 = {
    nome: 'Bola',
    preco: 15
};
Object.setPrototypeOf(prod2, Produto.prototype);

prod2.aumento(10);

const prod3 = Object.create(Produto.prototype, {
    preco:{
        writable: true,
        configurable: true,
        enumerable: true,
        value: 99
    },
    tamanho:{
        writable: true,
        configurable: true,
        enumerable: true,
        value: 42
    },
});
prod3.aumento(10);
console.log(prod3);

//validando CPF
function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo',{
        enumerable: true,
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
        
    });
}

ValidaCPF.prototype.valida = function(){
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -1);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;

    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    },0);

    const digito = 11 - (total % 11);
    return digito > 9 ? 0 : String(digito);
};

ValidaCPF.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

const cpf = new ValidaCPF('705.484.450-52');
if(cpf.valida()){
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}

//Banco
function Conta(agencia, conta, saldo){
    this.agencia = agencia;
    this.conta = conta;
    this.saldo = saldo;
};

Conta.prototype.sacar =  function(valor) {
    if(valor > this.saldo){
        console.log(`Saldo insuficiente: ${this.saldo}`);
        return;
    }
    this.saldo -= valor;
    this.verSaldo();
};
Conta.prototype.depositar =  function(valor) {
    this.saldo += valor;
    this.verSaldo();
};
Conta.prototype.verSaldo =  function() {
    console.log(`Ag/c: ${this.agencia}${this.conta} |` + `Saldo: R$${this.saldo.toFixed(2)}`);
};

function ContaCorrente(agencia, conta, saldo, limite){
    Conta.call(this, agencia, conta, saldo);
    this.limite = limite;
}

ContaCorrente.prototype = Object.create(Conta.prototype);
ContaCorrente.prototype.constructor = ContaCorrente;

ContaCorrente.prototype.sacar =  function(valor) {
    if(valor > (this.saldo + this.limite)){
        console.log(`Saldo insuficiente: ${this.saldo}`);
        return;
    }
    this.saldo -= valor;
    this.verSaldo();
};

//Polimorfismo
function ContaPoupanca(agencia, conta, saldo){
    Conta.call(this, agencia, conta, saldo);
}

ContaPoupanca.prototype = Object.create(Conta.prototype);
ContaPoupanca.prototype.constructor = ContaPoupanca;

const cc = new ContaCorrente(11, 33, 0);
cc.depositar(10);
cc.sacar(110);
cc.sacar(1);

console.log('Agora o comportamento do Polimorfismo');

const cp = new ContaPoupanca(11, 33, 0);
cp.depositar(10);
cp.sacar(10);
cp.sacar(1);

//Factory function ultilizando prototype
//composição
const falar = {
    falar(){
        console.log(`${this.nome} está falando`);
    },
};
const beber = {
    beber(){
        console.log(`${this.nome} está bebendo`);
    },
};
const comer = {
    comer(){
        console.log(`${this.nome} está cokendo`);
    },
};

const pessoaPrototype = Object.assign({}, falar,beber,comer);

function newPessoa(nome, sobrenome){
    return Object.create(pessoaPrototype, {
        nome: {value: nome},
        sobrenome: {value: sobrenome},
    });


}

const p5 = newPessoa('Jackson', 'Almeida');
console.log(p5);
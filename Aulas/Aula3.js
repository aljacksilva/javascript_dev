//Porgramação OB
class Pessoa {
    constructor(nome, sobrenome){
        this.nome = nome;
        this.sobrenome = sobrenome;
    }
    falar(){
        console.log(`${this.nome} está falando`);
    }
}

const p1 = new Pessoa('Jackson', 'Almeida');
console.log(p1);

//Getter Setter
const _velocidade = Symbol('velocidade');

class Carro {
    constructor(nome){
        this.nome = nome;
        this[_velocidade] = 0;
    }
    set velocidade(valor){
        if(typeof valor !== 'number') return;
        if(valor >= 100 || valor <= 0) return;
        this[_velocidade] = valor;
    }
    get velocidade(){
        return this[_velocidade];
    }
    acelerar(){
        if(this[_velocidade] >= 100) return;
        this[_velocidade]++;
    }
    freiar(){
        if(this[_velocidade] <= 0) return;
        this[_velocidade]--;
    }
}

const c1 = new Carro('Fusca');

for(let i = 0; i <= 100; i++){
    c1.acelerar();
}

c1.velocidade = 2000;
console.log(c1.velocidade);

//Herança- as classes filhas herdam do pai, mas não o inverso
class DispositivoEletronico {
    constructor(nome) {
        this.nome = nome;
        this.ligado = false;
    }

    ligar() {
        if(this.ligado){
            console.log(this.nome + ' já ligado');
        }
        this.ligado = true;
    }
    desligar() {
        if(this.ligado){
            console.log(this.nome + ' já desligado');
        }
        this.ligado = false;
    }
}

class Smarthope extends DispositivoEletronico {
    constructor(nome, cor) {
        super(nome);
        this.cor = cor;
    }
}

const s1 =  new Smarthope('iPhone', 'preto');
console.log(s1);

class ControleRemoto {
    constructor(tv) {
        this.tv = tv;
        this.volume = 0;
    }
    //Método de instância
    aumentarVolume(){
        this.volume += 2;
    }
    diminuirrVolume(){
        this.volume -= 2;
    }
    //Método estático
    static trocaPilha(){
        console.log('OK vou trocar');
    }
}

const controle = new ControleRemoto('LG');
controle.aumentarVolume();
controle.diminuirrVolume();
console.log(controle);
ControleRemoto.trocaPilha();

class ValidaCPF {
    constructor(cpfEnvidao){
        Object.defineProperty(this, 'cpfLimpo', {
            writable:false,
            enumerable:true,
            configurable: false,
            value: cpfEnvidao.replace(/\D+/g, ''),
        });
    }

    éSequência() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCPF() {
        const cpfSemDigitos =  this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
        const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF  = cpfSemDigitos + digito1 + digito2;
    }

    //possibilidade de usar o método estático porque não está instancidando de nenhum método. Pois não tem o this
    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for(let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }

        const digito = 11 - (total % 11);
        return digito <= 0 ? String(digito) : '0';
    }

    ValidaCPF(){
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.éSequência()) return false;
        this.geraNovoCPF();

        return this.novoCPF === this.cpfLimpo;
    }
}

let cpf = new ValidaCPF('705.484.450-52');

if(cpf.ValidaCPF()){
    console.log('CPF válido');
} else {
    console.log('CPF inválido');
}
/*
const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, required: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);
*/

const { async } = require('regenerator-runtime');
const validator = require('validator');

class Contato {

}

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.conato = null;

}

Contato.prototype.register = async function () {
  this.valida();

  if(this.errors.length > 0) return;
  
  this.contato = await ContatoModel.create(this.body);
};

Contato.buscaPorId = async function(id){
  if(typeof id !== 'string') return;
  const user = await ContatoModel.findById(id);
  return user;
}

//Validação de email e senha
Contato.prototype.valida = function(){
  this.cleanUp();
  //email precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatorio.');
  if(!this.body.email && !this.body.telefone) { 
    this.errors.push('É necessário pelo menos um contato precisa ser enviado email ou telefone!');
  }
}

Contato.prototype.cleanUp= function(){
  for (const key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.valida();

  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
};


module.exports = Contato;

const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');
/* Exporting the function paginaInicial. */

exports.paginaInicial = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
};

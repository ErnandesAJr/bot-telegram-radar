const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');

class OutrosController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    handle($) {
       
            salvar.salvarDados($.message);
       
        $.sendMessage('Esse comando não existe, verifique a lista de comandos para confirmar: clique ou digite o comando /comandos').catch(err => console.log(err))
    }
  }

  module.exports = OutrosController
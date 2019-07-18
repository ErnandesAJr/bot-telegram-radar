const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service');

class OutrosController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    handle($) {
       
            // salvar.salvarDados($.message);
        api.salvarLog($.message,'Enviou um comando fora da lista')
       
        $.sendMessage('Esse comando não existe, verifique a lista de comandos para confirmar: clique ou digite o comando /comandos').catch(err => console.log(err))
    }
  }

  module.exports = OutrosController
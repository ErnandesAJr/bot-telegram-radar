const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');

class PerguntaController extends TelegramBaseController { // Menu de Perguntas
    /**
     * @param {Scope} $ 
     */
    perguntaAction($) {
        salvar.salvarDados($.message);
        $.sendMessage('Comando Pergunta').catch(err => console.log(err)) // Buscar de outra classe ... Formatação mensagem de  comandos
    }
  
    get routes() {
        return {
            'pergunta': 'perguntaAction'
        }
    }
  }

  module.exports = PerguntaController;
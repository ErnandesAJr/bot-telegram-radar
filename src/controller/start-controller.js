const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const api = require('../services/api-service');


class StartController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    startAction($) {
        
        api.salvarLog($.message,'start')
       
        $.sendMessage(" Olá "+(($.message.chat.firstName))+": \n" +
        "\nSeja bem-vindo ao Bot de Suporte e Monitoramento da Mobit\n" +
        "\nCaso seja sua primeira vez com esse Bot será interessante que leia essas instruções !! É rapidinho, basta dar o comando :\n /instrucoes"+
        "\nPara verificar todas as funcionalidades que Bot pode fazer clique ou digite o comando ->:\n /comandos"+
        "\nTodos os equipamentos que tem o site geminado, use o nome completo para identificar !!").catch(err => console.log(err))
        
        
    }

      
  
    get routes() {
        return {
            'start': 'startAction'
        }
    }
  }

  module.exports = StartController;

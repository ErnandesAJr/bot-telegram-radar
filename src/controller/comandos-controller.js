const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service');

class ComandosController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    comandosAction($) {

        api.salvarLog($.message,'Enviado comando para visualizar todos os comandos')

        
            $.sendMessage(" Comandos existentes  \n" +
            "\nComandos de Informação:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
            "\nListar todas as bases :   /bases" +
            "\nInstruções : /instrucoes" +
            "\nAlgumas dicas para você:  /dicas" +
            "\nEscreva sua observação aqui :  /observacao" +
    
            "\n\nComandos Técnicos:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
            "\nDar um ping em Site:  /ping " +
            "\nLocalizar um site:  /localiza"+ 
            "\nVerificar Status de um Site: /status").catch(err => console.log(err)) 
        
    }
    
    get routes() {
        return {
            'comandos': 'comandosAction'
        }
    }
  }

  
  module.exports = ComandosController;
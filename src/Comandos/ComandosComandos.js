
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');

class ComandosController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    comandosAction($) {

        salvar.salvarDados($.message)
        //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)
     
            $.sendMessage(" Comandos existentes  \n" +
            "\nComandos de Informação:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
            "\nListar todas as bases :   /bases" +
            "\nInstruções : /instrucoes" +
            "\nAlgumas dicas para você:  /dicas" +
            //"\nEscreva sua observação aqui :  /observacao" +
    
            "\n\nComandos Técnicos:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
            "\nDar um ping em Site:  /ping " +
            "\nLocalizar um site:  /localiza"+ 
            "\nVerificar Status de um Site: /status").catch(err => console.log(err)) // Buscar de outra classe ... Formatação mensagem de  comandos
        
    }
    
    get routes() {
        return {
            'comandos': 'comandosAction'
        }
    }
  }

  
  module.exports = ComandosController;
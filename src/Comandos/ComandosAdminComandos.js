
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');

class ComandosAdminController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    comandosAdminAction($) {

        salvar.salvarDados($.message)
        //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)

        $.sendMessage(" Comandos existentes  \n" +
        "\nComandos de Informação:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
        "\nListar todas as bases :   /bases" +
        "\nInstruções : /instrucoes" +
        "\nAlgumas dicas para você:  /dicas" +
        "\nEscreva sua observação aqui :  /observacao" +
        "\n BroadCast para todos usuários do Telegram : /broadCast_Mobit_Suporte_Mosquito_@!05052018!@." +

       

        "\n\nComandos Técnicos:\n - - - - - - - - - - - - - - - - - - - - - - - - -" +
        "\nDar um ping em Site:  /ping " +
        "\nLocalizar um site:  /localiza"+ 
        "\nVerificar Status de um Site: /status") // Buscar de outra classe ... Formatação mensagem de  comandos
    }
    
    get routes() {
        return {
            'comandosAdmin@!Mobit18': 'comandosAdminAction'
        }
    }
  }

  

  
  module.exports = ComandosAdminController;
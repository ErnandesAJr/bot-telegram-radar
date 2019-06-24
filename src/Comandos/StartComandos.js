
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const format = require('string-format');
const salvar = require('../Banco/SalvarController');

format.extend(String.prototype);

class StartController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    startAction($) {
        salvar.salvarDados($.message);  
        //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)
        $.sendMessage(" Olá "+(($.message.chat.firstName))+": \n" +
        "\nSeja bem-vindo ao Bot de Suporte e Monitoramento da Mobit\n" +
        "\nCaso seja sua primeira vez com esse Bot será interessante que leia essas instruções !! É rapidinho, basta dar o comando :\n /instrucoes"+
        "\nPara verificar todas as funcionalidades que Bot pode fazer clique ou digite o comando:\n /comandos"+
        "\nTodos os equipamentos que tem o site geminado,use o serial completo para identificar !!").catch(err => console.log(err))
        // Buscar de outra classe... Formatação mensagem 
        
    }

      
  
    get routes() {
        return {
            'start': 'startAction'
        }
    }
  }

  module.exports = StartController;

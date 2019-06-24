const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const format = require('string-format');
const salvar = require('../Banco/SalvarController');

format.extend(String.prototype);

class IntrucoesController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    instrucoesAction($) {
        salvar.salvarDados($.message);
        $.sendMessage(" Olá, mais uma vez        --__(-,-)__--  \n" +
        "\n Sou o Bot do Monitoramento e Suporte e essas são algumas dicas para você:" +
        "\n\n 1) Para agilizar seu trabalho utilize o preenchimento automático de comandos" +
        "\n 2) Sempre que aparecer o comando em destaque (azul) na sua tela ele pode ser clicável " +
        "\n 3) Os comandos que precisam de alguma informação extra, como o nome do site, digite tudo em minúsculo e as letras junto com os números" +
        "\n 4) Eu ainda não faço tratamento de imagens ou gifs" +
        "\n 5) Todo comando retorna uma resposta, então espere um pouco em torno de 1 ou 2 minutos para comandos como /ping !!!").catch(err => console.log(err))
        
    }
  
    get routes() {
        return {
            'instrucoes': 'instrucoesAction'
        }
    }
  }

  module.exports = IntrucoesController;

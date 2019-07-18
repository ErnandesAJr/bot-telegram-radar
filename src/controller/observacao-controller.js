const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service');

class ObservacaoController extends TelegramBaseController { // é para ser um formulario 
    /**
     * @param {Scope} $ 
     */
    observacaoAction($) {

        const form = {
            informacao: {
                q: 'O que deseja informar ? ',
                error: 'Desculpe, algo não deu certo, tente novamente',
                validator: (message, callback) => {
                    if(message.text != "") {
                        var mensagem_texto = 'Observação: ';
                        mensagem_texto += message.text;
                        callback(true, (mensagem_texto))
                        return 
                    }
         
                    callback(false)
                }
            }

        }

        $.runForm(form, (resultado) => { 
                    
            if(resultado.informacao.length <= 500){
                api.salvarLog($.message,'Observação => ' + resultado.informacao)

                $.sendMessage("Mensagem salva com sucesso"+" "+ resultado.informacao).catch(err => console.log(err));
            }else{
                $.sendMessage("A mensagem de texto é muito grande ou aconteceu um erro no Banco de dados").catch(err => console.log(err));
            }

            }
        )

        
    }
  
    get routes() {
        return {
            'observacao': 'observacaoAction'
        }
    }
  }

  module.exports = ObservacaoController;
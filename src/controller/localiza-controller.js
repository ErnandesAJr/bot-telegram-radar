const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service.js');

class LocalizaController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    localizaAction($) {
        const form = {
            site: {
                q: 'Qual site deseja buscar a localização ?',
                error: 'Desculpe, algo não deu certo, tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                        const nome = message.text;
                        callback(true, nome) 
                        return 
                    }
                    callback(false)
                }
            }
        }

        $.runForm(form, (resultado) => {

            const site = resultado.site
            api.salvarLog($.message,'Localização => ' + site)
                
            api.buscarSite(site).then((resposta)=>{
                if(resposta.descricao.indexOf("não") >= 0){
                    $.sendMessage(
                        (
                        resposta.descricao + '\n' +
                        'Tente novamente, basta clicar aqui = > /localiza' + '\n' +
                        'Outros comandos = > /comandos' + '\n'

                        )
                        
                        ).catch(err => console.log(err));
                }else{

                     $.sendLocation(resposta.dados[0].latitude,resposta.dados[0].longitude).catch(err => console.log(err))
                     
                }
            
            })
            
        })
    }
  
    get routes() {
        return {
            'localiza': 'localizaAction'
        }
    }
  }

  module.exports = LocalizaController;
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const api = require('../services/api-service');

class BasesController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */

    basesAction($) {
        const form = {
            base: {
                q: 'Qual base deseja buscar a localização ?'+'\n' + '*Digite todas as letras maiúscula e sem acento',
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

            const base = resultado.base.toUpperCase()
            api.salvarLog($.message,'Base procurada => ' + base)
            var verificou = false
            var contador = resultado.base.length

            api.buscarBases().then((resposta)=>{
                
                resposta.dados.forEach((base_) => {
                    contador--
                    if(base === base_.nome){
                        verificou = true
                        $.sendMessage('Base => ' + base_.nome + '\n').then(()=>{
                                          
                        $.sendLocation(base_.latitude,base.longitude).catch(err => console.log(err))
    
                        }).catch(err => console.log(err))      
                    } 

                    if(contador === 0 && verificou === false){
                        $.sendMessage(
                            (
                            
                            'Tente novamente, basta clicar aqui = > /bases' + '\n' +
                            'Outros comandos = > /comandos' + '\n'
    
                            )
                            
                            ).catch(err => console.log(err));
                    }

                 });
            })
            
        })
    }
    

  
  
    get routes() {
        return {
            'bases': 'basesAction'
        }
    }
  }

  module.exports = BasesController;
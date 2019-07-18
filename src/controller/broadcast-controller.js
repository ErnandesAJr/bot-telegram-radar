const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service');

class BroadCastComandos extends TelegramBaseController { 
    /**
     * @param {Scope} $ 
     */
    broadCastAction($) {
        const form = {
            informacao: {
                q: 'O que deseja informar ? ',
                error: 'Desculpe, algo não deu certo, tente novamente',
                validator: (message, callback) => {
                    if(message.text != "") {
                        var mensagem_texto = ' ';
                        mensagem_texto += message.text;
                        callback(true, (mensagem_texto))
                        return 
                    }
                    callback(false)
                }
            }

        }

        $.runForm(form, (resultado) => { 
            $.sendMessage("Não foi possível enviar ...");
            api.salvarLog($.message,resultado.informacao)
           
            // if(resultado.informacao.length <= 500){
            //     let sql = "select dados.id_chat,dados.comando, dados.first_name from dados where dados.comando = '/start' group by dados.comando, dados.first_name,dados.id_chat";
                    
            //     conn.execSQLQuerySalvarDados(sql, function(error,results,fields) {
            //             if (error) {
            //                 return console.error(error.message);
            //             }else{
            //                 var mensagem_json = JSON.stringify(results);
            //                     mensagem_json = JSON.parse(mensagem_json);
            //                 var iterador_array = 0;
            //                 var tamanho_mensagem = results.length;

            //                 while(iterador_array < tamanho_mensagem){
                                   
            //                     if(mensagem_json[iterador_array].id_chat != $.message.chat.id){
            //                         $.api.sendMessage(mensagem_json[iterador_array].id_chat,"Olá "+ mensagem_json[iterador_array].first_name +", \n "+ resultado.informacao).catch(err => console.log(err))
            //                     }else{
            //                         $.sendMessage("Enviado com Sucesso");
            //                     }
            //                     if(iterador_array == 29){
            //                         funVerifique.sleep(60000);
            //                     }
            //                     iterador_array++;
            //                 }
            //             }
            //           });
                
            // }else{
            //     $.sendMessage("A mensagem de texto é muito grande ");
            // }

            }
        )
        
    }
  
    get routes() {
        return {
            'BroadCast_Mobit_Suporte': 'broadCastAction'
        }
    }
  }

  module.exports = BroadCastComandos;
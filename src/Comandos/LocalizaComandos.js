
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');

const conn = require('../Banco/Connection');
const funVerifique = require('../Banco/FuncoesVerificacao');

class LocalizaController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    localizaAction($) {
        //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)
        const form = {
            site: {
                q: 'Qual site deseja buscar a localização ?',
                error: 'Desculpe, algo não deu certo , tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                        var tratarNome = message.text;
                        var nome = 's';
                        if(tratarNome.toUpperCase().indexOf('T') != -1){
                            nome += (tratarNome.toUpperCase().split('T'))[1];
                        }else if(message.text.length >= 17){
                            nome = '/';
                        }
                        else{
                            nome = (tratarNome);
                        }                        
                        callback(true, nome) //you must pass the result also
                        return 
                    }
                    callback(false)
                }
            }
        }

        $.runForm(form, (resultado) => {
          
            if(resultado.site.indexOf('/') == -1 && resultado.site[0] == 's' && resultado.site.toUpperCase().indexOf('SELECT') == -1 && resultado.site.toUpperCase().indexOf('INSERT') == -1 && resultado.site.toUpperCase().indexOf('FROM') == -1 && resultado.site.toUpperCase().indexOf('DELETE') == -1 && resultado.site.length <= 17){
          
                let sql = 'SELECT IdEquipamento,Longitude,Latitude FROM equipamento where IdEquipamento ='+"'"+ resultado.site +"'";
                conn.execSQLQuery(sql, function(error,results,fields) {
                    if (error) {
                        return console.error(error.message);
                    }else{
                            var loc = funVerifique.verificarExistenciaSiteRetorneLoc(results,resultado.site);
                            if(loc != 0 && loc != null){
                                var url = loc.split(',');
                                
                                $.sendLocation(url[0],(url[1])).catch(err => console.log(err))
                                
                                salvar.salvarDados($.message,resultado.site);

                            }else{
                                $.sendMessage("Não existe esse Site no Banco de Dados");
                            }
                    }
                });
            }else{
                $.sendMessage("Verifique o que você digitou, possivelmente digitou o equipamento errado\n "+"Caso queria dar outro comando : /comandos ");
            }
        })
    }
  
    get routes() {
        return {
            'localiza': 'localizaAction'
        }
    }
  }

  module.exports = LocalizaController;
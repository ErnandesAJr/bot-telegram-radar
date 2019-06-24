
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const conn = require('../Banco/Connection');
const funVerifique = require('../Banco/FuncoesVerificacao');
const tcpp = require('tcp-ping');
const salvar = require('../Banco/SalvarController');
var status = " Não atualizado  <  < < < <"; 

var fs = require('fs');


class ScriptTeste extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */

    scriptAction(address_teste) {
        let sql = "SELECT dados.IdEquipamento,"+ 
        "dados.DataScript,dados.HoraScript, "+
        "dados.SincronismoSemaforo "+
        "FROM dados where dados.IdEquipamento ="+"'"+ address_teste +"'";
                conn.execSQLQuery(sql, function(error,results,fields) {
                    if (error) {
                        return console.error(error.message);
                    }else{
                      
                        var mensagem_json = JSON.stringify(results);
                            mensagem_json = JSON.parse(mensagem_json);
                         status =  mensagem_json[0].IdEquipamento +"                                  "+ mensagem_json[0].DataScript +"  " + mensagem_json[0].HoraScript + "                                " +mensagem_json[0].SincronismoSemaforo;            
                         fs.writeFile(address_teste+".txt", status +'\n',{enconding:'utf-8',flag: 'a'}, function(erro) {if(erro) {throw erro;}});
                        //console.log(address_teste+'.txt')
                        }
                }); 
      return status;
     }
    
  }

  module.exports = ScriptTeste;
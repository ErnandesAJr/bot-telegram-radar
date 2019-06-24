
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;

const conn = require('../Banco/Connection');
const funVerifique = require('../Banco/FuncoesVerificacao');
const salvar = require('../Banco/SalvarController');

 class StatusController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    statusAction($) {
       //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)

        const form = {
            site: {
                q: 'Digite o nome do site',
                error: 'Desculpe, algo deu errado, tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                            var tratarNome = message.text.toUpperCase();
                            var nome = 's';
                            if(tratarNome.toUpperCase().indexOf('ST') != -1){
                                nome += (tratarNome.toUpperCase().split('T'))[1];
                            }
                            else if(tratarNome.toUpperCase().indexOf('S') != -1){
                                nome += (tratarNome.toUpperCase().split('S'))[1];
                            }
                            else if(message.text.length >= 17){
                                nome = '/'
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

        if(resultado.site.indexOf('/') == -1 && resultado.site[0] == 's' 
            && resultado.site.toUpperCase().indexOf('SELECT') == -1 && resultado.site.toUpperCase().indexOf('INSERT') == -1 && resultado.site.toUpperCase().indexOf('FROM') == -1 
            && resultado.site.toUpperCase().indexOf('DELETE') == -1 && resultado.site.length <= 17 && resultado.site.toUpperCase().indexOf('!') == -1){
// DataHoraLote  DataHoraScript
            let sql = "SELECT dados.IdEquipamento,"+ 
            "DATE_FORMAT( dados.DataHoraLote, '%d/%m/%Y' ) as DataLote,"+
            "TIME_FORMAT(dados.DataHoraLote, '%H:%i:%s' ) as HoraLote,"+
            "DATE_FORMAT( dados.DataHoraScript, '%d/%m/%Y' ) as DataScript,"+
            "TIME_FORMAT(dados.DataHoraScript, '%H:%i:%s' ) as HoraScript,"+
            "dados.MmdStatus,"+
            "dados.CamStatus ,"+
            "dados.MmdStatus,"+
            "dados.MdeStatus,"+
            "dados.NumFaixas,"+
            "dados.EnergiaStatus  ,"+
            "dados.SincronismoSemaforo ,"+
            "inventario.MemRam,"+
            "inventario.Processador,"+
            "inventario.Ocr,"+
            "inventario.VersaoRsservicemanager,"+
            "inventario.CamNum,"+
            "equipamento.Base FROM dados "+
                             " INNER JOIN inventario ON dados.IdEquipamento ="+"'"+ resultado.site +"'"+ " AND inventario.IdEquipamento ="+ "'"+ resultado.site+"'"+
                             " INNER JOIN equipamento ON inventario.IdEquipamento =" +"'"+resultado.site+"'"+ "AND equipamento.IdEquipamento = " +"'"+resultado.site+"'"




            
            conn.execSQLQuery(sql, function(error,results,fields) {
                if (error) {
                    return console.error(error.message);
                }else{
                    //console.log(results)
                    var status = funVerifique.verificarExistenciaStatus(results,resultado.site);
                    if(status != 0){
                        salvar.salvarDados($.message,resultado.site);

                        $.sendMessage(status).catch(err => console.log(err));
                    }else{
                        $.sendMessage("O site pesquisado não foi encontrado no Banco de Dados, talvez essas sejam as possíveis causas: \n"+
                        "1_) O site foi digitado incorretamente ou \n"+
                        "2_) O site é geminado   \n"+
                        "Caso o site foi digitado corretamente e eu não consegui encontra-lo, envie uma observação para mim. Para fazer isso basta clicar ou escrever o comando: /observacao").catch(err => console.log(err));
                    }
                }
                }); 
        }else{
            $.sendMessage("Verifique o que digitou, possivelmente digitou errado \n "+"Caso queria dar outro comando : /comandos ");
            
        }

        })
    }
  
    get routes() {
        return {
            'status': 'statusAction'
        }
    }
  }

  module.exports = StatusController;
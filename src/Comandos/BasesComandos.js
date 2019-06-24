
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController


const conn = require('../Banco/Connection');
const salvar = require('../Banco/SalvarController');

class BasesController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
    
    basesAction($) {
        salvar.salvarDados($.message);

        let sql = 'SELECT * FROM base';
        conn.execSQLQuery(sql, function(error,results,fields) {
            if (error) {
                return console.error(error.message);
            }else{

                var mensagem_sql = results;
                var mensagem_json = JSON.stringify(mensagem_sql);
                mensagem_json = JSON.parse(mensagem_json);
                var iterador_array = 0;
                var tamanho_mensagem = mensagem_sql.length;
                while(iterador_array < tamanho_mensagem ){
                        var url = mensagem_json[iterador_array].Latitude+","+mensagem_json[iterador_array].Longitude;
                        //console.log(mensagem_json)
                        iterador_array++;
                        if(url != null){
                            //$.sendLocation(mensagem_json[iterador_array - 1].Latitude,(mensagem_json[iterador_array - 1].Longitude),mensagem_json[iterador_array - 1].IdBase)
                            var urla = 'https://www.google.com/maps?q='+url;
                            $.sendMessage("A base é "+ mensagem_json[iterador_array -1].IdBase+" "+urla).catch(err => console.log(err))
                        }else{
                            url = "**Erros**";
                        }
                }
            }
          });

    }
  
    get routes() {
        return {
            'bases': 'basesAction'
        }
    }
  }

  module.exports = BasesController;
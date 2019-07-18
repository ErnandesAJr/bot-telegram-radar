const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const api = require('../services/api-service.js');
const tcpp = require('tcp-ping');


class PingController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    pingAction($) {
        const form = {
            site: {
                q: 'Para qual site gostaria de dar um ping ?',
                error: 'Desculpe, algo não deu certo , tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                        const nome = message.text;
    
                        callback(true, nome) 
                        return 
                    }
                    callback(false)
                }
            },

            porta: {
                q: 'Digite a porta que deseja utilizar',
                error: 'Desculpe, algo não deu certo, tente novamente',
                validator: (message, callback) => {
                    if(message.text != null) { 
                        callback(true, (message.text))
                        return 
                    }
         
                    callback(false)
                }
            }

        }

        $.runForm(form, (resultado) => {
            const site = resultado.site
                
            api.buscarSite(site).then((resposta)=>{
                if(resposta.descricao.indexOf("não") >= 0){
                    $.sendMessage(
                        (

                            resposta.descricao + '\n' +
                            'Tente novamente, basta clicar aqui = > /ping' + '\n' +
                            'Outros comandos = > /comandos' + '\n'

                        )
                        
                    ).catch(err => console.log(err));
                }else{
                       const ip = resposta.dados[0].ultimo_ip
                       const porta = resultado.porta
                       const tentativas = 5
                       const equipamento = resposta.dados[0].equipamento;
                     
                       $.sendMessage( 'Aguarde ...' + '\n').catch(err => console.log(err))
                       tcpp.ping(
                           {
                               address:ip,
                               port:porta,
                               attempts:tentativas
                            }, function(err, data) {
                                    api.salvarLog($.message,'Equipamento '+ equipamento + ', porta '+ porta)
                                    if(isNaN(data.avg)){
                                        $.sendMessage( equipamento +" está *Morto!* T.T \n" +
                                        "\n Nós tentamos " + data.attempts +" vezes, mas não respondeu!!." +
                                        "\n Tente novamente para outra porta: /ping").catch(err => console.log(err))
                                    }
                                    else{
                                        $.sendMessage(equipamento + " está *Vivo!* e a porta Aberta !!\n" +
                                        "\nMédia de tempo de resposta: "+data.avg.toFixed(2)+ "ms" +
                                        "\nMáximo tempo de resposta: "+ data.max.toFixed(2)+" ms" +
                                        "\nMinimo tempo de resposta: "+data.min.toFixed(2)+" ms").catch(err => console.log(err));
                                    }
                         });
                     //$.sendLocation(resposta.dados[0].latitude,resposta.dados[0].longitude).catch(err => console.log(err))
                     
                }
            
            })



            // if(resultado.site.indexOf('/') == -1 && resultado.site[0] == 's' && resultado.site.toUpperCase().indexOf('SELECT') == -1 && resultado.site.toUpperCase().indexOf('INSERT') == -1 
            //    && resultado.site.toUpperCase().indexOf('FROM') == -1 && resultado.site.toUpperCase().indexOf('DELETE') == -1
            //    && resultado.site.indexOf('/') == -1 && resultado.porta.toUpperCase().indexOf('SELECT') == -1 && resultado.porta.toUpperCase().indexOf('INSERT') == -1     
            //    && resultado.porta.toUpperCase().indexOf('FROM') == -1 && resultado.porta.toUpperCase().indexOf('DELETE') == -1 && resultado.site.length <= 17){
               
            //     let sql ='SELECT dados.UltimoIp, dados.IdEquipamento,equipamento.Url FROM dados Inner Join equipamento ON equipamento.IdEquipamento = '+"'"+ resultado.site +"'" +' AND  dados.IdEquipamento =' +"'"+ resultado.site +"'";
            //     conn.execSQLQuery(sql, function(error,results,fields) {
            //         if (error) {
            //             return console.error(error.message);
            //         }else{
            //                 var mensagem_json = JSON.stringify(results);
            //                 mensagem_json = JSON.parse(mensagem_json);

            //                 var address_bd = funVerifique.verificarExistenciaSiteRetorneIP(results,resultado.site);
            //                 //console.log(address_bd);
            //                 if(address_bd != 0 && address_bd != null && resultado.porta >=0 && resultado.porta < 65536){
            //                     //console.log(address_bd)
            //                     $.sendMessage("Processando . . . ").catch(err => console.log(err))
            //                     salvar.salvarDados($.message,"Site: "+resultado.site+" porta:"+resultado.porta);
                                
            //                     tcpp.ping({address:address_bd,port:resultado.porta,attempts:5}, function(err, data) {
            //                         //console.log(data)
            //                         if(isNaN(data.avg)){
            //                             $.sendMessage( resultado.site+" está *Morto!* T.T \n" +
            //                             "\nNós tentamos "+ data.attempts+" vezes, mas não tem ninguém em casa!!." +
            //                             "\n Tente novamente para outra porta: /ping").catch(err => console.log(err))
            //                         }
            //                         else{
            //                             $.sendMessage(resultado.site + " está *Vivo!* e a porta Aberta !! Entrando ...\n" +
            //                             "\nMédia de tempo de resposta: "+data.avg.toFixed(2)+ "ms" +
            //                             "\nMáximo tempo de resposta: "+ data.max.toFixed(2)+" ms" +
            //                             "\nMinimo tempo de resposta: "+data.min.toFixed(2)+" ms").catch(err => console.log(err));
            //                         }
            //                     });
                            
            //                  }else if(address_bd == 0){
            //                     $.sendMessage("O site pesquisado não foi encontrado no Banco de Dados, talvez essas sejam as possíveis causas: \n"+
            //                     "1_) O site foi digitado incorretamente ou \n"+
            //                     "2_) O site é geminado ou \n"+
            //                     "3_) A porta especificada está fechada, então tente outra porta: /ping  \n"+
            //                     "Caso o site foi digitado corretamente e eu não consegui encontra-lo, envie uma observação para mim. Para fazer isso basta clicar ou escrever o comando: /observacao").catch(err => console.log(err)); 
            //                  }else if(address_bd == null){
            //                     $.sendMessage("Por enquanto não temos informações suficentes para dar um ping nesse equipamento -_(' _ ')_- \n").catch(err => console.log(err)); 
            //                 }
            //         }
            //     });
            // }else{
            //     $.sendMessage("Verifique o que você digitou: "+ resultado.site +"\n "+resultado.porta+" \n Caso queria dar outro comando : /comandos ").catch(err => console.log(err));
            // }
        })
    
    }
  
    get routes() {
        return {
            'ping': 'pingAction'
        }
    }
  }

  module.exports = PingController;

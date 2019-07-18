
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const api = require('../services/api-service.js');

class StatusController extends TelegramBaseController {

    /**
     * @param {Scope} $ 
     */
   
    statusAction($) {
        const form = {
            site: {
                q: 'Digite o nome do site',
                error: 'Desculpe, algo deu errado, tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                        const nome = message.text.toUpperCase()

                        callback(true, nome) 
                        return 
                    }
         
                    callback(false)
                }
            }
        }

    $.runForm(form, async (resultado) => {
            const site = resultado.site
            api.salvarLog($.message,'Enviado '+ site)
                
            api.buscarSite(site).then((resposta)=>{
                if(resposta.descricao.indexOf("não")>=0){
                    $.sendMessage(
                        (
                        resposta.descricao + '\n' +
                        'Tente novamente, basta clicar => /status'
                        )
                        
                        ).catch(err => console.log(err));
                }else{
                    var status = ''
                
                    if(resposta.dados[0].informacoes[0].status !== 'NORMAL'){
                        status = '\n' + ' ** PROBLEMAS APRESENTADOS ** ' + '\n'
                        resposta.dados[0].informacoes[0].descricao.forEach(element => {
                            status +=  '\n' + element + '\n'
                        });
                    }else{
                        status = '\n' + 'Site não apresentou nenhum problema !' + '\n'+ 'Tudo ok, vida que segue !'
                    }
                    $.sendMessage(
                        (
                            ' /-------------------------- DADOS -----------------------/  ' + '\n \n'+

                            'Equipamento = > ' +   resposta.dados[0].equipamento + '\n' +
                            'Cidade = > ' + resposta.dados[0].cidade  + '\n' +
                            'Data Script = > ' + resposta.dados[0].data_script  + '\n' +
                            'Data Lote = > ' + resposta.dados[0].data_lote  + '\n \n' +

                            ' /-------------------- INVENTÁRIO -----------------/  ' + '\n \n'+
                            'Processador = > ' + resposta.dados[0].inventario[0].processador  + '\n' +
                            'Memoria Ram = > ' + resposta.dados[0].inventario[0].memoria_ram + ' Gb' + '\n' +
                            'Tamanho do Disco = > ' + resposta.dados[0].inventario[0].tamanho_disco + ' Gb'  + '\n' +
                            'OCR = > ' + resposta.dados[0].inventario[0].ocr  + '\n' +
                            'Número de câmeras = > ' + resposta.dados[0].inventario[0].numero_de_cameras  + '\n' +
                            'Versão do RSSERVICEMANGER = > ' + resposta.dados[0].inventario[0].versao_rsservicemanager  + '\n' +
                            'Versão do MobitUtils = > ' + resposta.dados[0].inventario[0].versao_mobitutils + '\n \n' +

                            ' /----------------------- STATUS --------------------/  ' + '\n' + status 
                        )
                        
                    ).catch(err => console.log(err));
                }
            
            })

        })
    }
  
    get routes() {
        return {
            'status': 'statusAction'
        }
    }
  }

  module.exports = StatusController;
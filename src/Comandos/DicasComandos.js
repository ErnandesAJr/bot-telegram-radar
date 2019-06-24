const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController;
const salvar = require('../Banco/SalvarController');
class DicasController extends TelegramBaseController {
   
    /**
     * @param {Scope} $ 
     */

    dicasAction($) {
        //console.log(" Username : "+$.message.chat.username + "\n Nome: "+ $.message.chat.firstName + " "+$.message.chat.lastName+ "\n Chat_Id: "+$.message.chat.id+"\n Texto: "+ $.message.text+"\n Data: "+$.message.date)
        
        salvar.salvarDados($.message);
        const form = {
            assunto: {
                q: 'Digite o número do assunto: \n'+
                "A - VERIFICAÇÃO DE LOGS  \n"+
                "B - IMAGENS DE TESTE DNIT  \n"+
                "C - CPU e MEMÓRIA  \n"+
                "D -  ATUALIZAÇÃO RÁPIDA DO MRG  \n"+
                "E -  VERIFICAR O ENVIO PARA PRF  \n"+
                "F -  COMANDOS PARA VER PROCESSOS  \n"+
                "G -  REBOOT  \n",
                error: 'Desculpe, algo não deu certo , tente novamente !',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text) //you must pass the result also
                        return 
                    }
                    callback(false)
                }
            }

        }

        $.runForm(form, (resultado) => {
            if(resultado.assunto == 'A'){
                $.sendMessage("\n  --- VERIFICALÇÃO DE LOGS ---\n \n"+ 
                'Teste de queda de energia:\n'.toUpperCase() + 
                '$ less /var/log/syslog | grep -i "energia"  \n\n'+
                
                'Teste de desligamento do Mrg:\n'.toUpperCase() +
                '$ less /var/log/syslog | grep -i "imklog" \n\n'+
                
                "Estado de funcionamento do rsconfig:\n".toUpperCase() +
                "$ sudo service rsjetty status \n \n"+
        
                "Verificar funcionamento da câmeras:\n".toUpperCase() + 
                "$ less /var/rscontrol/log/rs_cam_verify.log | grep -i off  \n\n"+
                
                "Verificar funcionamento da câmeras - se ta funcionando:\n".toUpperCase() +
                "$ less  /var/rscontrol/log/rs_cam_verify.log | grep -i cam  \n \n"+               
                
                "Verificar logs do equipamento:\n".toUpperCase() +
                "$ less /var/log/syslog \n \n"+
                
                'Verificar sincronismo do semáforo:\n'.toUpperCase() +
                ' 1) less /var/log/syslog | grep  -i "sem sinc" | less \n'+
                ' 2) less /var/log/syslog | grep  -i "foro” | less \n \n'+

                'Envio ao servidor:\n'.toUpperCase() +
                '$ less /var/rscontrol/log/rsservices.log | grep  -i "SFTP" \n');
            }else if(resultado.assunto == 'B'){
                $.sendMessage(   
                    "\n   --- IMAGENS TESTE DO DNIT ---   \n \n"+  
                    "Verificar criação de imagens teste do DNIT:  \n".toUpperCase()+
                    '$ less /var/log/syslog | grep -i teste! \n \n')
            }else if(resultado.assunto == 'C'){
                $.sendMessage('Essa opção não existe C !')
            }else if(resultado.assunto == 'D'){
                $.sendMessage('Essa opção não existe D !')
            }else if(resultado.assunto == 'E'){
                $.sendMessage('Essa opção não existe E !')
            }else if(resultado.assunto == 'F'){
                $.sendMessage('Essa opção não existe F !')
            }else if(resultado.assunto == 'G'){
                $.sendMessage("\n  --- REBOOT ---\n \n"+
        
                "Reset no Rsjetty: \n".toUpperCase() +
                "$ sudo service rsjetty restart  \n\n"+
        
                "Verificar Reboot do MRG: \n".toUpperCase() +
                "$ last reboot  \n\n"+
                
                "Reiniciar o MRG:\n".toUpperCase() +
                "$ sudo reboot  \n\n");
            }else{
                $.sendMessage('Essa opção não existe OUTRA!')
            }
        })
    }

 
    get routes() {
        return {
            'dicas': 'dicasAction'
        }
    }
  }

  module.exports = DicasController;
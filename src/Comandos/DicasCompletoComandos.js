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
        $.sendMessage("\n  --- REBOOT ---\n \n"+
        
        "Reset no Rsjetty: \n".toUpperCase() +
        "$ sudo service rsjetty restart  \n\n"+

        "Verificar Reboot do MRG: \n".toUpperCase() +
        "$ last reboot  \n\n"+
        
        "Reiniciar o MRG:\n".toUpperCase() +
        "$ sudo reboot  \n\n").catch(err => console.log(err))


        $.sendMessage("\n  --- VERIFICAÇÃO DE LOGS ---\n \n"+ 
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

        "Verificação de status de dispositivos MDE,exemplo:\n".toUpperCase() +
        "$ cat /var/rscontrol/log/rsservices.log | grep -i 'mde 1' \n \n"+   

        "Verificação de status de dispositivos MDE,exemplo:\n".toUpperCase() +
        "$ tail -f /var/log/rsservices.log | grep -i det: \n \n"+   
        
        'Verificar sincronismo do semáforo:\n'.toUpperCase() +
        ' 1) $ less /var/log/syslog | grep  -i "sem sinc" | less \n'+
        ' 2) $ less /var/log/syslog | grep  -i "foro” | less \n \n'+

        'Envio ao servidor:\n'.toUpperCase() +
        '$ less /var/rscontrol/log/rsservices.log | grep  -i "SFTP" \n').catch(err => console.log(err))

        $.sendMessage(   
        "\n   --- IMAGENS TESTE DO DNIT ---   \n \n"+ 
        
        "Verificar criação de imagens teste do DNIT:  \n".toUpperCase()+
        '$ less /var/log/syslog | grep -i teste! \n \n').catch(err => console.log(err))

        $.sendMessage(

        "\n  --- CPU e MEMÓRIA --- \n \n"+ 
        
        "Verificar processador do equipamento:  \n".toUpperCase()+
        "$ less /proc/cpuinfo \n\n"+
        " Verificar memoria ram do equipamento:  \n".toUpperCase()+
        "$ less /proc/meminfo \n\n").catch(err => console.log(err))

        $.sendMessage(
        
        "\n --- ATUALIZAÇÃO RÁPIDA DO MRG ---  \n \n"+ 
        
        " Atualizar a lista dos repositórios:  \n".toUpperCase()+
        "$sudo apt-get update \n\n"+
        " Atualizar para ultima versão: \n".toUpperCase()+
        "$ sudo apt-get install rscontrol").catch(err => console.log(err))

        $.sendMessage(
        "\n\n  --- COMANDOS PARA PRF ---  \n \n"+ 
        "Verificar envio :  \n".toUpperCase()+        
        "$ less /var/rscontrol/log/rsservices.log | grep -i prf \n").catch(err => console.log(err))
        $.sendMessage(   
        "\n --- COMANDOS PARA VER PROCESSOS ---   \n \n"+ 

        "Mostrar Processos Ativos:  \n".toUpperCase()+
        "$ top -d 1 \n"
        ).catch(err => console.log(err))
    }

 
    get routes() {
        return {
            'dicas': 'dicasAction'
        }
    }
  }

  module.exports = DicasController;


































// ("\n  *-- COMANDOS PARA AJUDAR NO DIA A DIA --*\n \n"+ 
//                     '*Teste de queda de energia:*\n' + 
//                     '$ less /var/log/syslog | grep -i "energia"  \n\n'+
                    
//                     '*Teste de desligamento do Mrg:*\n ' +
//                     '$ less /var/log/syslog | grep -i "imklog" \n\n'+
                    
//                     "*Estado de funcionamento do rsconfig:*\n " +
//                     "$ sudo service rsjetty status \n \n"+
                    
//                     "*Reset no Rsjetty:* \n " +
//                     "$ sudo service rsjetty restart  \n\n"+
                    
//                     "*Reiniciar o Mrg:*\n " +
//                     "$ sudo reboot  \n\n"+
                    
//                     "*Verificar funcionamento da câmeras - se ta desligado:*\n " + 
//                     "$ less /var/rscontrol/log/rs_cam_verify.log | grep -i off  \n\n"+
                    
//                     "*Verificar funcionamento da câmeras - se ta funcionando:*\n " +
//                     "$ less  /var/rscontrol/log/rs_cam_verify.log | grep -i cam  \n \n"+               
                    
//                     "*Verificar logs do equipamento:*\n " +
//                     "$ less /var/log/syslog \n \n"+
                    
//                     '*Verificar sincronismo do semáforo*:\n'+
//                     ' 1) less /var/log/syslog | grep  -i "sem sinc" | less \n'+
//                     ' 2) less /var/log/syslog | grep  -i "foro” | less \n \n'+
    
//                     '*Envio ao servidor:*\n' +
//                     '$ less /var/rscontrol/log/rsservices.log | grep  -i "SFTP" \n'+
                    
//                     "\n  * --- IMAGENS TESTE DO DNIT --- *  \n \n"+ 
                    
//                     "*Verificar criação de imagens teste do DNIT:*  \n"+
//                     '$ less /var/log/syslog | grep -i teste! \n \n'+
                
    
//                     "\n  *--- CPU e MEMÓRIA ---*  \n \n"+ 
                    
//                     "*Verificar processador do equipamento:*  \n"+
//                     "$ less /proc/cpuinfo \n\n"+
//                     " *Verificar memoria ram do equipamento:*  \n"+
//                     "$ less /proc/meminfo \n\n"+
                    
//                     "\n *--- ATUALIZAÇÃO RÁPIDA DO MRG ---*  \n \n"+ 
                    
//                     " *Atualizar a lista dos repositórios:*  \n"+
//                     "$sudo apt-get update \n\n"+
//                     " *Atualizar para ultima versão:*  \n"+
//                     "$ sudo apt-get install rscontrol"+
                    
//                     "\n\n  *--- VERIFICAR O ENVIO PARA PRF --- * \n \n"+ 
    
                    
//                     "*Teste de queda de energia:*  \n"+
//                     "$ less /var/rscontrol/log/rsservices.log | grep -i prf \n"+
    
//                     "\n * COMANDOS PARA VER PROCESSOS *  \n \n"+ 
    
//                     "*Mostrar Processos Ativos:*  \n"+
//                     "$ top -d 1 \n"
//                     );
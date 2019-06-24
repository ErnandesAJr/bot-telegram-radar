

var moment = require('moment');

const conn = require('../Banco/Connection');


module.exports = {
    
    salvarDados(dados_mensagem,texto){
        let comando = dados_mensagem.text;
        if(texto == null){
            texto = '-'
        }else if(texto.toUpperCase().indexOf('INSERT') != -1 || texto.toUpperCase().indexOf('SELECT') != -1 || texto.toUpperCase().indexOf('FROM') != -1 || texto.toUpperCase().indexOf('*') != -1 || texto.indexOf('DELETE') != -1 || texto.indexOf('UPDATE') != -1 || texto.indexOf(';') != -1 || texto.indexOf('|') != -1 ){
            //console.log(texto);
            console.log(comando.toUpperCase()+" "+dados_mensagem.chat.firstName+" "+ dados_mensagem.chat.id);
            texto = 'Verificar LOG'
        }  
        
        if(comando != null){
            if(comando.toUpperCase() != '/COMANDOS' && comando.toUpperCase() != '/PING' && comando.toUpperCase() != '/BASES' && comando.toUpperCase() != '/OBSERVACAO' && comando.toUpperCase() !='/DICAS'  && comando.toUpperCase() != '/LOCALIZA' && comando.toUpperCase() != '/STATUS' && comando.toUpperCase() != '/INSTRUCOES' && comando.toUpperCase() != '/START'){
                console.log(comando.toUpperCase()+" "+dados_mensagem.chat.firstName+" "+ dados_mensagem.chat.id);
                comando = 'Verificar LOG'
            }
            if(comando.toUpperCase().indexOf('INSERT') != -1 || comando.toUpperCase().indexOf('SELECT') != -1 || comando.toUpperCase().indexOf('FROM') != -1 || comando.toUpperCase().indexOf('*') != -1 || comando.toUpperCase().indexOf('DELETE') != -1 || comando.toUpperCase().indexOf('UPDATE') != -1 || comando.toUpperCase().indexOf(';') != -1 || comando.toUpperCase().indexOf('-1') != -1){
                //console.log(comando);
                console.log(comando.toUpperCase()+" "+dados_mensagem.chat.firstName+" "+ dados_mensagem.chat.id);

                comando = 'Foi enviado um comando de acesso ao Banco de Dados'            
            }
        }else{
            //console.log(dados_mensagem.sticker)
            if(dados_mensagem.sticker != null){
                comando = "foi enviado um stricker";
                console.log(dados_mensagem.sticker.emoji +" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)
            }else if(dados_mensagem.photo){
                comando = "foi enviado uma foto";
                console.log(dados_mensagem.photo+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id )
            }else if(dados_mensagem.video){
                comando = "foi enviado um video";
                console.log(dados_mensagem.video+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)

            }else if(dados_mensagem.voice){
                comando = "foi enviado um audio";
                console.log(dados_mensagem.voice+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)

            }else if(dados_mensagem.location){
                comando = "foi enviado uma localizao";
               console.log(dados_mensagem.location+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)

            }else if(dados_mensagem.contact){
                comando = "foi enviado um contato";
                console.log(dados_mensagem.contact+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)

            }else if(dados_mensagem.document){
                comando = "foi enviado um documento";
                console.log(dados_mensagem.document+" "+ dados_mensagem.chat.firstName +" "+dados_mensagem.chat.id)
            }
            
        }
        
        let id_chat = dados_mensagem.chat.id;
        let first_name = dados_mensagem.chat.firstName;
        let last_name = dados_mensagem.chat.lastName;
        let username = dados_mensagem.chat.username;
        let date_chat = dados_mensagem.date;
        let text_chat = texto;
        //let comando = JSON.stringify("Comando :'"+dados_mensagem.text);
  
        

        var dateTimeString = moment(date_chat*1000).format("DD-MM-YYYY HH:mm:ss");
       
        //console.log(dateTimeString); // ta aqui
        let sql = "INSERT INTO dados (first_name,last_name,username,date_chat,text_chat,comando,id_chat) " +
        "VALUES (" +"'"+first_name+"',"+"'"+last_name+"',"+"'"+username+"',"+"'"+dateTimeString+"',"+"'"+text_chat+"',"+"'"+comando+"',"+"'"+id_chat+"'"+")";
       
         conn.execSQLQuerySalvarDados(sql,function(error,results,fields) {
            if (error) {
                return console.error(error.message);
            }else{
                return true;            
            }
          });
    }

    

}

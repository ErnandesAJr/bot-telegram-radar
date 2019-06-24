module.exports = {

//Retorna todas as bases com a localização  ---  no Futuro pode colocar o numero de telefone da Base tbm 
verificarExistenciaBaseRetorneNomesBases(mensagem_sql){
    var mensagem_json = JSON.stringify(mensagem_sql);
        mensagem_json = JSON.parse(mensagem_json);
    var iterador_array = 0;
    var tamanho_mensagem = mensagem_sql.length;
    //console.log(mensagem_json)
    var nomeBases = "As *Bases são* : \n";
    while(iterador_array < tamanho_mensagem ){
            // var url = 'google.com/maps/?q='+mensagem_json[iterador_array].Latitude+","+mensagem_json[iterador_array].Longitude;

            var url = mensagem_json[iterador_array].Latitude+","+mensagem_json[iterador_array].Longitude;
            nomeBases += (iterador_array + 1) + " - " + mensagem_json[iterador_array].IdBase +" \n ---- Localização desta Base é:  "+ url + " \n" ;
            iterador_array++;
        }
        nomeBases= JSON.stringify(nomeBases)
        nomeBases = JSON.parse(nomeBases);
    
        return nomeBases;
},

//Verifica se o Nome do Site buscado existe no Banco de Dados : boolean - ip existe 0  se não
verificarExistenciaSiteRetorneIP(mensagem_sql,nome_buscar){
        var mensagem_json = JSON.stringify(mensagem_sql);
            mensagem_json = JSON.parse(mensagem_json);
        var iterador_array = 0;
        if(mensagem_json.length > 0){
            if(mensagem_json[iterador_array].IdEquipamento == nome_buscar){ // olhar como está no banco de dados
                if(mensagem_json[iterador_array].UltimoIp == '1.1.1.1' || mensagem_json[iterador_array].UltimoIp == '' || mensagem_json[iterador_array].UltimoIp == null){
                    if(mensagem_json[iterador_array].Url == null || mensagem_json[iterador_array].Url == ''){
                        var ip = null;
                        return ip;
                    }else{
                        var ip = mensagem_json[iterador_array].Url
                        return ip;
                    }
                }else{
                    var ip = mensagem_json[iterador_array].UltimoIp;
                   
                    return ip;
                }
            }
        }else{
            return 0;      
        }        
},

verificarExistenciaSiteRetorneLoc(mensagem_sql,nome_buscar){
    let mensagem_json = JSON.stringify(mensagem_sql);
        mensagem_json = JSON.parse(mensagem_json);
    let iterador_array = 0;
    let lat = 0;
    let long = 0;
    if(mensagem_json.length > 0){
        if(mensagem_json[iterador_array].IdEquipamento == nome_buscar ){ // olhar como está no banco de dados
            long = mensagem_json[iterador_array].Longitude;
            lat =  mensagem_json[iterador_array].Latitude;
        if(lat ==  null || long == null){
            return null;
        }else{
            return lat + "," + long;
        }

    }else{
        return 0;            
    }
    }else{
        return 0;
    }
},

sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
        break;
    }
}  
},
//tratamento de erros aqui
verificarExistenciaStatus(mensagem_sql,nome_buscar){
    var mensagem_json = JSON.stringify(mensagem_sql);
        mensagem_json = JSON.parse(mensagem_json);
       
    var iterador_array = 0;
    var texto_status = '';
    var mensagem_de_sem_informação = "Sem essa informação, por enquanto";
    var mensagem_boa = 'EM OPERAÇÃO !!';
    var mensagem_ruim = ' FORA DE OPERAÇÃO'
    let semaforo1;
    let semaforo2;

    if(mensagem_json.length > 0){

        if(mensagem_json[iterador_array].IdEquipamento == nome_buscar ){ // olhar como está no banco de dados
            
            if(mensagem_json[iterador_array].DataScript == null || mensagem_json[iterador_array].HoraScript == null ){
                texto_status = " Ainda não todas as informações sobre esse equipamento. " + "\n" +" Estamos providenciando para ter todos os equipamentos cadastrados !"
                
                texto_status += " \n A BASE responsável pelo equipamento é : "+ mensagem_json[iterador_array].Base;
                return texto_status;
            }else{
                var date_lote = (mensagem_json[iterador_array].DataLote)
                var hora_lote = (mensagem_json[iterador_array].HoraLote)
                
                var date_script = (mensagem_json[iterador_array].DataScript)
                var hora_script = (mensagem_json[iterador_array].HoraScript)
           
                //console.log(mensagem_json)
                if (date_lote == null ||  date_lote == '') {
                    date_lote = mensagem_de_sem_informação;
                }
                if (hora_lote == null || hora_lote == '') {
                    hora_lote = mensagem_de_sem_informação
                }


                if (date_script == null ||  date_script == '') {
                    date_script = mensagem_de_sem_informação;
                }
                if (hora_script == null || hora_script == '') {
                    hora_script = mensagem_de_sem_informação
                }

                if (mensagem_json[iterador_array].MmdStatus == 0) {
                    mensagem_json[iterador_array].MmdStatus = mensagem_boa;
                } else if (mensagem_json[iterador_array].MmdStatus == 1) {
                    mensagem_json[iterador_array].MmdStatus = mensagem_ruim //verificar se pode ser null
                } else {
                    mensagem_json[iterador_array].MmdStatus = mensagem_de_sem_informação //verificar se pode ser null
                }

                if (mensagem_json[iterador_array].CamStatus == 0) {
                    mensagem_json[iterador_array].CamStatus = mensagem_boa;
                } else if (mensagem_json[iterador_array].CamStatus == 'null') {
                    mensagem_json[iterador_array].CamStatus = mensagem_de_sem_informação;
                } else {
                    var cameras_defeito = "Câmeras em Falha : ";
                    cameras_defeito += mensagem_json[iterador_array].CamStatus ;
                    mensagem_json[iterador_array].CamStatus = cameras_defeito;

                }

                if (mensagem_json[iterador_array].SincronismoSemaforo == null) {
                    mensagem_json[iterador_array].SincronismoSemaforo = mensagem_de_sem_informação;
                } else if (mensagem_json[iterador_array].SincronismoSemaforo.split('|')[0] == 0) {
                   semaforo1 = mensagem_boa;
                } else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[0] == -1) {
                   semaforo1 = " Não possui esse semáforo "                     
                } else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[0] == 1) {
                    semaforo1 = mensagem_ruim                     
                } else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[0] == 2) {
                    semaforo1 = " Amarelo Piscante "                     
                }
                
                if (mensagem_json[iterador_array].SincronismoSemaforo.split('|')[1] == 0) {
                    semaforo2 = mensagem_boa
                }else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[1] == -1) {
                    semaforo2 = " Não possui esse semáforo "                     
                } else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[1] == 1) {
                    semaforo2 = mensagem_ruim                     
                }else if(mensagem_json[iterador_array].SincronismoSemaforo.split('|')[1] == 2) {
                    semaforo2 = " Amarelo Piscante "                     
                }

                if (mensagem_json[iterador_array].MdeStatus == -1) {
                    mensagem_json[iterador_array].MdeStatus = " Não possui MDE "
                } else if (mensagem_json[iterador_array].MdeStatus == 0) {
                    mensagem_json[iterador_array].MdeStatus =mensagem_boa;
                } else {
                    mensagem_json[iterador_array].MdeStatus = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].CamNum == null) {
                    mensagem_json[iterador_array].CamNum = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].NumFaixas == null) {
                    mensagem_json[iterador_array].NumFaixas = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].EnergiaStatus == 0) {
                    mensagem_json[iterador_array].EnergiaStatus = mensagem_boa;
                } else if (mensagem_json[iterador_array].EnergiaStatus == 1) {
                    mensagem_json[iterador_array].EnergiaStatus = " Envio de mensagem de FALHA DE ENERGIA no log "
                } else if (mensagem_json[iterador_array].EnergiaStatus == 2) {
                    mensagem_json[iterador_array].EnergiaStatus = " Envio de mensagem de FALTA DE ENERGIA no log "
                } else {
                    mensagem_json[iterador_array].EnergiaStatus = mensagem_de_sem_informação;;
                }

                if (mensagem_json[iterador_array].Ocr == null) {
                    mensagem_json[iterador_array].Ocr = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].VersaoRsservicemanager == null) {
                    mensagem_json[iterador_array].VersaoRsservicemanager = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].Processador == null) {
                    mensagem_json[iterador_array].Processador = mensagem_de_sem_informação;
                }

                if (mensagem_json[iterador_array].MemRam == null) {
                    mensagem_json[iterador_array].MemRam = mensagem_de_sem_informação;
                }else{
                    mensagem_json[iterador_array].MemRam += ' gb';

                }

                //console.log("ST"+mensagem_json[iterador_array].IdEquipamento.split('s')[1]);
                texto_status =  "   Equipamento -- " + "ST"+ mensagem_json[iterador_array].IdEquipamento.split('s')[1] + "\n" +
                                " Base -- "+ mensagem_json[iterador_array].Base + "\n" +
                                " Data e Hora de Envio do Strix -- "+ date_script +" "+ hora_script +"\n" +
                                " Data e Hora de Envio do Ultimo Lote -- "+ date_lote +" "+ hora_lote +"\n\n" +

                                
                                " Status das Cameras -- " +  mensagem_json[iterador_array].CamStatus + "\n" +
                                " Status do Módulo Medidor -- " + mensagem_json[iterador_array].MmdStatus + "\n" +
                                " Status do Módulo de Display Externo -- " + mensagem_json[iterador_array].MdeStatus + "\n" +
                                " Status de Energia -- " + mensagem_json[iterador_array].EnergiaStatus + "\n" +
                                " Sincronismo de Semáforo 1 -- " + semaforo1 + "\n" +
                                " Sincronismo de Semáforo 2 -- " + semaforo2 + "\n\n" +
                                
                                " Número de Faixas -- " + mensagem_json[iterador_array].NumFaixas + "\n" +
                                " Número de Cameras -- " + mensagem_json[iterador_array].CamNum + "\n" +
                                " Versão RSServiceManager -- "+ mensagem_json[iterador_array].VersaoRsservicemanager + "\n" +
                                " Memória Ram -- "+ mensagem_json[iterador_array].MemRam + "\n" +
                                " Processador -- "+ mensagem_json[iterador_array].Processador + "\n"+
                                " OCR -- "+ mensagem_json[iterador_array].Ocr + "\n";
                return texto_status;
            }          
        }else{
                return 0;           
        }
    }else{
        return 0;           
    }
         
    
}



}
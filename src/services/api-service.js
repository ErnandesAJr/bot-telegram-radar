const axios = require('axios');
var moment = require('moment');

module.exports = {
    
     buscarBases(){
        return new Promise((resolve,reject) => {

            var reposta_mensagem = []
            axios.get(process.env.URL_API_BASES)
                    .then(function (resposta) {
                        reposta_mensagem = resposta.data
                    })
                    .catch(function (error) {
                        reposta_mensagem = error.response.data
                    })
                    .then(function () {
                        return resolve(reposta_mensagem)
                    });          
        })
    },
    buscarSite(nome) {

        return new Promise((resolve,reject) => {

            var reposta_mensagem = []
            axios.get(process.env.URL_API_EQUIPAMENTO + nome)
                    .then(function (resposta) {
                        reposta_mensagem = resposta.data
                    })
                    .catch(function (error) {
                        reposta_mensagem = error.response.data
                     
                    })
                    .then(function () {
                        return resolve(reposta_mensagem)
                    });          
        })
    
    },
    salvarLog(dados,texto) {
        const comando = dados.text;

        if(texto === null){
            texto = '-'
        }
        const id_chat = dados.chat.id;
        const first_name = dados.chat.firstName;
        const last_name = dados.chat.lastName;
        const nome = first_name + ' ' +last_name

        const username = dados.chat.username;
        const date_chat = moment(dados.date*1000).format("DD-MM-YYYY HH:mm:ss");;
        const text_chat = texto;


        return new Promise((resolve,reject) => {

            var reposta_mensagem = []
            axios.post(process.env.URL_API_LOG_BOT, {
                        nome:nome,
                        username: username,
                        data_chat: date_chat,
                        texto_chat: text_chat,
                        comando: comando,
                        id_chat: id_chat,

                    })
                    .then(function (resposta) {
                        reposta_mensagem = resposta.data
                    })
                    .catch(function (error) {
                        reposta_mensagem = error.response.data

                        console.log(error);
                    })
                    .then(function () {
                        return resolve(reposta_mensagem)
                    });   
              
        })
    
    }

}

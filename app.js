'use strict'
require('dotenv').config()

/**
 * @file
 * @author  Ernandes Azevedo Junior <eandesjunior@hotmail.com>
 * @version 1.0
*/

const Telegram = require('telegram-node-bot')

/**
 * Responsavel para buscar todos os comandos que o usuário digitar  
*/
const TextCommand = Telegram.TextCommand 
// 
/**
 * Resposavel para se conecta com o bot do telegram, através do TOKEN e com o tratamento nesse servidor, passando host , porta e quantidade de 'trabalhadores'  
*/
const chatbot = new Telegram.Telegram(process.env.TOKEN_BOT,{
    webAdmin: {
      port: process.env.PORT_PLAY,
      host: process.env.HOST_PLAY
    },workers:process.env.WORKERS
    
})
/**
 * Funções que não utilizam acesso ao banco  
*/
const StartController = require('./src/controller/start-controller');
const ComandosController = require('./src/controller/comandos-controller');
const DicasCompletoController = require('./src/controller/dicas-completo-controller');
const ObservacaoController = require('./src/controller/observacao-controller');
const InstrucoesController = require('./src/controller/instrucoes-controller');
const OutrosController = require('./src/controller/outros-controller');

/**
 * Funções que utilizam acesso ao banco  
*/
const BasesController = require('./src/controller/bases-controller');
const PingController = require('./src/controller/ping-controller');
const StatusController = require('./src/controller/status-controller');
const LocalizaController = require('./src/controller/localiza-controller');
const BroadCastController = require('./src/controller/broadcast-controller');

/**
 * Responsável por deliberar qual controlador vai ser ativo dependendo do comando que foi digitado
*/
chatbot.router.when(
        new TextCommand('/start', 'start'), new StartController()
       ).when(
        new TextCommand('/instrucoes', 'instrucoes'), new InstrucoesController()
       ).when(
        new TextCommand('/comandos', 'comandos'), new ComandosController()
       ).when(
        new TextCommand('/menu', 'comandos'), new ComandosController()  
       ).when(
        new TextCommand('/dicas', 'dicas'), new DicasCompletoController()
       ).when(
        new TextCommand('/observacao', 'observacao'), new ObservacaoController()
       ).when(   
        new TextCommand('/bases', 'bases'), new BasesController()
       ).when(
        new TextCommand('/ping', 'ping'), new PingController()
       ).when(
        new TextCommand('/status', 'status'), new StatusController()
       ).when(
        new TextCommand('/localiza', 'localiza'), new LocalizaController()
       ).when(
        new TextCommand('/broadcast2019', 'broadcast2019'), new BroadCastController()
       ).otherwise(new OutrosController())
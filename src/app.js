'use strict'// evita criar variaveis com o mesmo nome ou sem o 'var, let ou const'


const Telegram = require('telegram-node-bot')

const TextCommand = Telegram.TextCommand // pegar os comandos que o usuario digitar
const token_jacurutu_mobit = '679494837:AAGz31_MQx2SVvdE3rVb36JsfG_X0OSBWXM';
const token_strix_mobit = '658783275:AAHb6GoDJx3Eo9oeoHnT2qfDZxSscYyzkw4';

const chatbot = new Telegram.Telegram(token_strix_mobit,{
    webAdmin: {
      port: 3301,
      host: 'localhost'
    },workers:4
    
}) // BotTesteMelhor_bot Jacurutu_Mobit

//normais
const StartController = require('./Comandos/StartComandos');
const ComandosController = require('./Comandos/ComandosComandos');
const DicasController = require('./Comandos/DicasComandos');
const DicasCompletoController = require('./Comandos/DicasCompletoComandos');
const PerguntaController = require('./Comandos/PerguntaComandos');
const ObservacaoController = require('./Comandos/ObservacaoComandos');
const InstrucoesController = require('./Comandos/IntrucoesComandos');
const ComandosAdminController = require('./Comandos/ComandosAdminComandos');


//acesso ao Banco
const BasesController = require('./Comandos/BasesComandos');
const PingController = require('./Comandos/PingComandos');
const StatusController = require('./Comandos/StatusComandos');
const LocalizaController = require('./Comandos/LocalizaComandos');
const BroadCastController = require('./Comandos/BroadCastComandos');

const OutrosController = require('./Comandos/OutrosComandos');

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
        new TextCommand('/pergunta', 'pergunta'), new PerguntaController()
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
        new TextCommand('/broadCast_Mobit_Suporte_Mosquito', 'BroadCast_Mobit_Suporte'), new BroadCastController()
       ).when(
        new TextCommand('/Admin@!Mobit18', 'comandosAdmin@!Mobit18'), new ComandosAdminController()
       ).otherwise(new OutrosController())
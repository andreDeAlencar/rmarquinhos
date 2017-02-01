// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.


/*=========================================================================================================================*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
var token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/dado/, function (msg) {
  var chatId = msg.chat.id;
  var diceNumber = getRandomIntInclusive(1, 6);
  
  bot.sendMessage(chatId, diceNumber);
});

bot.onText(/\/oxe/, function (msg) {
  var chatId = msg.chat.id;
  var text = "mainha";
  
  bot.sendMessage(chatId, text);
});

bot.onText(/\/soletre (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var resp = match[1];
  var spelled = resp.charAt(0);
  var blank = ' ';
  
  for (var i = 1; i < resp.length; i++) {
    spelled += blank + resp.charAt(i);   
  }
  bot.sendMessage(chatId, spelled);
});

bot.answerInlineQuery("teste", ["ok", "nok"]);

// Listen for any kind of message. There are different kinds of
// messages.
/*
bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, msg.text);
});
*/

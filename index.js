// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const axios = require('axios').default

venom
  .create({
    session: 'm', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  function start(client) {
    client.onMessage((message) => {
      if (message.from == "51934935843@c.us" && message.isMedia == false){
            axios.post('http://127.0.0.1:8000/text',{
            user_id : message.from,
            message:message.body
          })
          .then(function(response){
            client
            .sendText(message.from, response.data.reply)
            .then((result) =>{
              console.log('Result: ', result);
            })
            .catch((e) =>{
              console.error('Error when sending: ', e)
            })
          }
          );
        }
        
        else if(message.isMedia === True && message.isGroupMsg === false){
          axios.post('http://127.0.0.1:8000/image',{
              user_id: message.from,
              message:message.body
          })
          .then(function(response){
            client
            .sendText(message.from, response.data.reply)
            .then((result) => {
              console.log('Result',result);
            })
            .catch((e) => {
              console.error('Error when sending: ',e)
            })
          })
        }
    })
  }

/*   function start(client) {
    client.onMessage((message) => {
      if (message.body.startsWith('/')) {
        axios.post('http://127.0.0.1:8000/response',{
          user : message.from,
          message:message.body
        })
        .then(function (response){
          var respuesta;
          switch(message.body){
            case 1 : 
              respuesta;
            break;

            case 2:
              respuesta = ' ';
            break;
          }

          return respuesta;

          client
          .sendText(message.from, response.data.reply)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
        })
      }
    });
  } */
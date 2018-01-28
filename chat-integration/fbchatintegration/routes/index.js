var express = require('express');
var router = express.Router();
var request = require('request');
const PAGE_ACCESS_TOKEN="EAACbW8JF9IkBAPh1PdAdLKg376hjXBo200gPTJfP8qZAR2xqOZAGYZAtcxA5IKlgZCZBub8StDtckhly2ZAVqm90EZAVYJPBl4rdvgHx6MSHGP5QALuIHKlBLVcs5xxojZB4mJA2d9icdZCstcK8JcUFDXyg0HS4WtdZAHU3dpMKd1h7sVV6apmc79";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function receivedMessageStore(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  request({
    uri: 'https://cognition.live/watson/'+messageText,
    method: 'GET'

  }, function (error, response, body) {
    console.log(body);
    body=JSON.parse(body);
    if (!error && response.statusCode == 200) {
      if (body.intents.length>0 && body.intents[0].intent) {
        switch (body.intents[0].intent) {
          case 'cobrar':
            sendGenericMessage(recipientID, messageText.substring(body.entities[0].location[0],body.entities[0].location[1]));
            break;

          default:
            console.log("hearing");
            //sendTextMessageStore(recipientID, "repito: "+messageText);
        }
      } else if (messageAttachments) {
        console.log("hearing");
        //sendTextMessage(recipientID, "Message with attachment received");
      }
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });

}


function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}

function sendGenericMessage(recipientId,quantity) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
      "type":"template",
        "payload":{
          "template_type":"button",
          "text":"Pago asegurado con Banregio",
          "buttons":[
            {
              "type":"web_url",
              "url":"http://cognition.live:8080",
              "title":"$"+quantity
            }
          ]
        }
      }
    }
  };

  callSendAPI(messageData);
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function sendTextMessageStore(recipientId, messageText) {
  var messageData = {
    message_type:"UPDATE",
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  console.log(messageData);
  try{
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
  }
  catch(err){
    console.log(err);
  }

}



//Watson
router.get('/watson/:text', (req, res) => {
  console.log("working");
  var ConversationV1 = require('watson-developer-cloud/conversation/v1');

  var conversation = new ConversationV1({
    url: "https://gateway.watsonplatform.net/conversation/api",
    username: "99fe2a28-6407-4227-9701-06d55b572c28",
    password: "v7CdgcZ8mL5l",
    version_date: ConversationV1.VERSION_DATE_2017_05_26
  });

  conversation.message(
    {
      input: { text: req.params.text},
      workspace_id: 'dd995004-4f6b-4d21-b250-84fafafbd725'
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        console.log(JSON.stringify(response, null, 2));
        res.json(response)
      }
    }
  );
});


router.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "fintechhackwoohoo") {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});


// Creates the endpoint for our webhook
router.post('/webhook', (req, res) => {

  var data = req.body;
  console.log(data);
  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          try{
            if("is_echo" in event.message && !("app_id" in event.message)){
              console.log(event.message);
              receivedMessageStore(event);
            }
            else {
              receivedMessage(event);
            }
          }
          catch(err){
            console.log(err);
          }
        }
        else if (event.postback) {
          receivedPostback(event);
        }
        else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }


});


module.exports = router;

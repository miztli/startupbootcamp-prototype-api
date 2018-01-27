var express = require('express');
var router = express.Router();

const PAGE_ACCESS_TOKEN="EAACbW8JF9IkBAKjHCgLm1C8q0xw9cfp6RmNg0ggKZCwjjR1Xud4jlfxDKnn6JI1fB83ZCgFZAOzvSZBJx8ZBGdONyCpg4SyfmZCpcueNKiX7KIsVBdNpwpLUPYZA5EvEt5CeYe9ksB92ZA26wza8IbXZB40czeZBdYZBZAgTnjUG89fgsuh9zwjmRL1i";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function handleMessage(sender_psid, received_message) {

  let response;

  // Check if the message contains text
  if (received_message.text) {

    // Create the payload for a basic text message
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": "EAACbW8JF9IkBAKjHCgLm1C8q0xw9cfp6RmNg0ggKZCwjjR1Xud4jlfxDKnn6JI1fB83ZCgFZAOzvSZBJx8ZBGdONyCpg4SyfmZCpcueNKiX7KIsVBdNpwpLUPYZA5EvEt5CeYe9ksB92ZA26wza8IbXZB40czeZBdYZBZAgTnjUG89fgsuh9zwjmRL1i" },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
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
      }
    }
  );
});


// Adds support for GET requests to our webhook
router.get('/webhook', (req, res) => {

  const VERIFY_TOKEN ="EAACbW8JF9IkBAHQhSbFxSV3fofMoDOVsDj8yauehMIIs06qrPUjWoD2jfnbDwC2ZCrnAYkmKHJObqe26DC20brEa6YNRwOky4UAlxTZAYbqDUGMnZCK3Uv38q26IpJA8x4IM314ri8YsS7iNv6sMwJ3RiqzZCOZBXEDAhDX1MDuZAygb0in2ED";
  // Your verify token. Should be a random string.
  //let VERIFY_TOKEN = "fintechhackwoohoo";

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Creates the endpoint for our webhook
router.post('/webhook', (req, res) => {

  // Parse the request body from the POST
  console.log("Working");
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

  body.entry.forEach(function(entry) {

    // Gets the body of the webhook event
    let webhook_event = entry.messaging[0];
    console.log(webhook_event);


    // Get the sender PSID
    let sender_psid = webhook_event.sender.id;
    console.log('Sender PSID: ' + sender_psid);

    // Check if the event is a message or postback and
    // pass the event to the appropriate handler function
    if (webhook_event.message) {
      handleMessage(sender_psid, webhook_event.message);
    } else if (webhook_event.postback) {
      handlePostback(sender_psid, webhook_event.postback);
    }

  });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


module.exports = router;

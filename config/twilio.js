const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE;

import twilio from 'twilio';
const client = twilio(accountSid, authToken);

// const client = require('twilio')(accountSid, authToken);
// const client = import 


client.messages
  .create({
    body: 'Hello from twilio-node',
    to: '+19092879906', // Text your number
    from: twilioNumber, // From a valid Twilio number
  })
  .then((message) => console.log(message));

  export default client;
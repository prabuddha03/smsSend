const express = require("express");
const twilio = require("twilio");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

async function sendSMS() {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages
    .create({
      body: "Hey Policeman there is an alert message, do check your email",
      from: "+18456903933",
      to: process.env.PHONE_NUMBER,
    })
    .then((message) => {
      console.log(message, "Message Sent");
    })
    .catch((err) => {
      console.log(err, "Message not Sent");
    });
}

// Define a route to trigger the SMS
app.get('/send-sms', async (req, res) => {
  try {
    await sendSMS();
    res.status(200).send('SMS sent successfully!');
  } catch (error) {
    res.status(500).send('Failed to send SMS');
  }
});

app.listen(5002, () => console.log("Listening at port 5002"));

const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: "你的CHANNEL_ACCESS_TOKEN",
  channelSecret: "你的CHANNEL_SECRET"
};

const app = express();

const client = new line.Client(config);

app.post("/webhook", line.middleware(config), async (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "你剛剛說：" + event.message.text
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

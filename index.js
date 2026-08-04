import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import order_created from "./src/routes/webhooks/order_created.js";
import order_updated from "./src/routes/webhooks/order_updated.js";
import cart_created from "./src/routes/webhooks/cart_created.js";
import draft_created from "./src/routes/webhooks/draft_created.js";
import cart_updated from "./src/routes/webhooks/cart_updated.js";
// import twilio from "./config/twilio.js";
// import db from "./config/database.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/webhooks/order_created", order_created);
app.post("/webhooks/order_updated", order_updated);
app.post("/webhooks/cart_created", cart_created);
app.post("/webhooks/draft_created", draft_created);
app.post("/webhooks/cart_updated", cart_updated);

app.listen(port, function () {
  // db();
  console.log(`UFW listening on port ${port}!`);
});

// twi

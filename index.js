import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import order_created from "./src/routes/webhooks/order_created.js";
import order_updated from "./src/routes/webhooks/order_updated.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/webhooks/order_created", order_created);
app.post("/webhooks/order_updated", order_updated);

app.listen(port, function () {
  console.log(`UFW listening on port ${port}!`);
});

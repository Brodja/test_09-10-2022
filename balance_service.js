require("dotenv").config();
const express = require("express"),
  app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT | 5000;
const db = require("./app/config/db");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

require("./app/routes/balance.routes")(app);
require("./app/routes/story.routes")(app);

const start = async () => {
  try {
    db().then(() => {
      app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

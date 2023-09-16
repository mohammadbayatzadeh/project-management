const Application = require("./app/server");
require("dotenv").config();

new Application(3000, process.env.MONGO_URL);

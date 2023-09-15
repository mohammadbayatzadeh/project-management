const Application = require("./app/server");
const url =
  "mongodb+srv://mamadbayat777:12345@mbcuster.f0hquh3.mongodb.net/?retryWrites=true&w=majority";
new Application(3000, url);

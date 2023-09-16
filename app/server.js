const { AllRouters } = require("./routers/router");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();

  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorhandler();
  }

  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, ".." + "/public")));
  }

  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log("server run on " + PORT + " port http://localhost:" + PORT);
    });
  }

  async configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    if (mongoose.connections[0].readyState) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL);
    console.log("db connected");
  }

  errorhandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "صفحه مورد نظر یافت نشد",
      });
    });

    this.#app.use((err, req, res, next) => {
      const status = err?.status || err?.statusCode || 500;
      const message = err?.message || err?.messages || "internal server error";
      return res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }

  createRoutes() {
    this.#app.use(AllRouters);
  }
};

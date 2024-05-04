module.exports = (app) => {
  const API_URL = "/api/v" + process.env.API_VERSION;

  const heroRouter = require("./heroRouter");
  app.use(API_URL + "/hero", heroRouter);

  app.get(API_URL, (req, res) => {
    res.json({ message: "Welcome to HERO API" });
  });

  // 404 error
  app.use(function (req, res, next) {
    res.status(404).json({
      error: {
        errors: [
          { domain: "global", reason: "notFound", message: "Not Found" },
        ],
        code: 404,
        message: "Not Found",
      },
    });
  });
};

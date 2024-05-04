require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
const cors = require("cors");
const connectionRetry = require("./config/dbConfig");
const passport = require("passport");
const openAPI = require("./config/openAPI");

const app: Express = express();

require("./config/authConfig")(passport);
app.use(passport.initialize());

if (process.env.NODE_ENV == "development") {
  app.use(
    "/docs",
    openAPI.swaggerUi.serve,
    openAPI.swaggerUi.setup(openAPI.swaggerSpec, openAPI.optionsSwaggerUI)
  );
}

// Errors in json format
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).send({ error: err });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = process.env.FRONTEND_URL
  ? { origin: process.env.FRONTEND_URL }
  : {};

app.use(cors(corsOptions));

// Connect to database
connectionRetry();

// Routers
require("./routes/index")(app);

process.env.PORT = process.env.PORT || "3000";
app.listen(process.env.PORT, () => {
  console.log(`\n\x1b[32mServer is running on port ${process.env.PORT}\x1b[0m`);
});

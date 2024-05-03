const mongoose = require("mongoose");
const { setTimeout } = require("timers/promises");

const connectionRetry = async () => {
  let connected = false;

  const dbURI = process.env.DB_URI;

  try {
    await mongoose.connect(dbURI);
    connected = true;
    console.log("\x1b[32mConnected to database\x1b[0m");
  } catch (err) {
    console.log("\x1b[31m[ERROR] Connect: " + err.message + " \x1b[0m");
  }

  if (!connected) {
    console.log("\x1b[90m[INFO] Trying reconnect to database on 10s \x1b[0m");
    await setTimeout(10000);
    await connectionRetry();
  }
};

module.exports = connectionRetry;

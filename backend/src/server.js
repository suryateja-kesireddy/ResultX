const app = require("./app");
const config = require("./config");

app.listen(config.port, () => {
  console.log("=================================");
  console.log("🚀 ResultX Backend Started");
  console.log(`🌐 Server : http://localhost:${config.port}`);
  console.log(`📦 Mode   : ${config.nodeEnv}`);
  console.log("=================================");
});
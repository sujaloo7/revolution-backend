let express = require("express");
config = require("./configs");
bodyParser = require("body-parser");
jwt = require("jsonwebtoken");
cors = require("cors");
http = require("http");
morgan = require("morgan");
compress = require("compression");

module.exports = function () {
  console.log("env" + process.env.NODE_ENV);
  var app = express();
  //console.log(__dirname)
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    app.use(compress({ threshold: 2 }));
  }

  app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

  app.use(bodyParser.json({ limit: "500mb", extended: true }));

  require("../app/routes/CommonApiRoutes")(app, express);
  require("../app/routes/UserRoutes")(app, express);

  return app;
};

module.exports = (app, express) => {
  const router = express.Router();
  const ServicesController = require("../controllers/ServicesController");

  //   services routes

  router.post("/addServices", (req, res) => {
    const servicesObj = new ServicesController().boot(req, res);
    return servicesObj.AddServices();
  });

  router.post("/getPortfolio", (req, res) => {
    const servicesObj = new ServicesController().boot(req, res);
    return servicesObj.GetServices();
  });

  router.post("/updatePortfolio", (req, res) => {
    const servicesObj = new ServicesController().boot(req, res);
    return servicesObj.UpdateServices();
  });

  app.use(config.baseApiUrl, router);
};
